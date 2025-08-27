package org.kobus.spring.controller;

import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.kobus.spring.domain.pay.SeasonTicketOptionDTO;
import org.kobus.spring.domain.pay.SeasonTicketRouteDTO;
import org.kobus.spring.mapper.pay.PassRotLinInfMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/adtnprdnew/pass")
public class ReadPassRotLinInfController {

    @Autowired
    private PassRotLinInfMapper passRotLinInfMapper;

    @GetMapping("/readPassRotLinInf.ajax")
    public Map<String, Object> getAllRoutes() {
        List<SeasonTicketRouteDTO> list = passRotLinInfMapper.getAllRoutes();

        List<Map<String, Object>> rotList = new ArrayList<>();
        for (SeasonTicketRouteDTO dto : list) {
            Map<String, Object> obj = new HashMap<>();
            obj.put("routeId", dto.getRouteId());
            obj.put("deprNm", dto.getDeprNm());
            obj.put("arvlNm", dto.getArvlNm());
            obj.put("adtnPrdSellSttDt", dto.getAdtnPrdSellSttDt());
            
            obj.put("subRouteId", dto.getSubRouteId());
            obj.put("adtnDeprNm", dto.getAdtnDeprNm());
            obj.put("adtnArvlNm", dto.getAdtnArvlNm());
            obj.put("adtnDeprCd", dto.getAdtnDeprCd());
            obj.put("adtnArvlCd", dto.getAdtnArvlCd());

            rotList.add(obj);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("adtnRotInfList", rotList);
        result.put("len", rotList.size());

        return result;
    }
    
    @PostMapping("readPassDtlInf.ajax")
    public Map<String, Object> getOptionsByRoute(HttpServletRequest request) {
        String routeId = request.getParameter("rotLinInf");
        if (routeId == null || routeId.isBlank()) {
            return Map.of("adtnDtlList", List.of(), "len", 0);
        }

        List<SeasonTicketOptionDTO> list = passRotLinInfMapper.getOptionsByRouteId(routeId);
        List<Map<String, Object>> optionList = new ArrayList<>();

        for (SeasonTicketOptionDTO dto : list) {
            Map<String, Object> obj = new HashMap<>();
            obj.put("adtnPrdUseClsCd", dto.getAdtnPrdUseClsCd());
            obj.put("adtnPrdUseClsNm", dto.getAdtnPrdUseClsNm());
            obj.put("adtnPrdUsePsbDno", dto.getAdtnPrdUsePsbDno());
            obj.put("adtnPrdUseNtknCd", dto.getAdtnPrdUseNtknCd());
            obj.put("adtnPrdUseNtknNm", dto.getAdtnPrdUseNtknNm());
            obj.put("wkdWkeNtknCd", dto.getWkdWkeNtknCd());
            obj.put("wkdWkeNtknNm", dto.getWkdWkeNtknNm());
            obj.put("adtnPrdSno", dto.getAdtnPrdSno());

            int basePricePerDay = 10000;
            int discountPricePerDay = 9000;
            int days = 0;
            try {
                String daysStr = dto.getAdtnPrdUsePsbDno();
                if (daysStr != null && !daysStr.trim().isEmpty()) {
                    days = Integer.parseInt(daysStr.trim());
                }
            } catch (NumberFormatException e) {
                days = 0;
            }

            String useClsNm = dto.getAdtnPrdUseClsNm() != null ? dto.getAdtnPrdUseClsNm().trim() : "";
            int price = "전체등급(프리미엄 제외)".equals(useClsNm)
                    ? discountPricePerDay * days
                    : basePricePerDay * days;

            obj.put("pubAmt", price);
            optionList.add(obj);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("adtnDtlList", optionList);
        result.put("len", optionList.size());
        return result;
    }
    
    @PostMapping("/readPassVldTerm.ajax")
    public void getPassValidTerm(
            @RequestParam(value = "startDate", required = false) String startDate,
            @RequestParam(value = "period", required = false) String periodStr,
            HttpServletResponse resp
    ) throws Exception {

        JSONObject result = new JSONObject();

        if (startDate == null || periodStr == null || startDate.trim().isEmpty() || periodStr.trim().isEmpty()) {
            System.out.println("[Warn] 파라미터 누락! (startDate, period) -> startDate: [" + startDate + "], period: [" + periodStr + "]");
            result.put("fulTerm", "");
            result.put("rotAllCnt", 0);
            result.put("termSttDt", "");
            resp.setContentType("application/json; charset=UTF-8");
            PrintWriter out = resp.getWriter();
            out.write(result.toString());
            out.close();
            return;
        }

        try {
            startDate = startDate.trim();
            periodStr = periodStr.trim();
            LocalDate stt = LocalDate.parse(startDate, DateTimeFormatter.ofPattern("yyyyMMdd"));
            int period = Integer.parseInt(periodStr);
            LocalDate end = stt.plusDays(period - 1);

            String fulTerm = stt.format(DateTimeFormatter.ofPattern("yyyy.MM.dd")) +
                             " ~ " +
                             end.format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
            String termSttDt = stt.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

            result.put("fulTerm", fulTerm);
            result.put("rotAllCnt", 1);
            result.put("termSttDt", termSttDt);
            result.put("timDte", termSttDt);  // timDte도 동일 값으로 반환
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("startDate: [" + startDate + "], period: [" + periodStr + "]");
            result.put("fulTerm", "");
            result.put("rotAllCnt", 0);
        }

        resp.setContentType("application/json; charset=UTF-8");
        PrintWriter out = resp.getWriter();
        out.write(result.toString());
        out.close();
    }

}

