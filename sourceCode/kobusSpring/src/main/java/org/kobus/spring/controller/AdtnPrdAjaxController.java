package org.kobus.spring.controller;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.kobus.spring.domain.pay.FreePassDTO;
import org.kobus.spring.domain.pay.ResPassUsageDTO;
import org.kobus.spring.domain.pay.ResSeasonUsageDTO;
import org.kobus.spring.domain.pay.SeasonTicketDTO;
import org.kobus.spring.mapper.pay.FreePassMapper;
import org.kobus.spring.mapper.pay.SeasonTicketMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/mrs")
public class AdtnPrdAjaxController {

    @Autowired
    private FreePassMapper freePassMapper; // FREE_PASS_PAYMENT + USAGE
    @Autowired
    private SeasonTicketMapper seasonTicketMapper; // SEASON_TICKET_PAYMENT + USAGE

    @PostMapping("/adtnPrdValNew.ajax")
    @ResponseBody
    public Map<String, Object> getAdtnPrdList(HttpServletRequest request) {
        Map<String, Object> result = new HashMap<>();

        try {
            String kusid = request.getParameter("kusid");
            if (kusid == null || kusid.isEmpty()) {
                result.put("prdListCnt", 0);
                result.put("MSG_CD", "E0001");
                return result;
            }

            // ✅ 프리패스: 결제 내역 + 옵션 조회
            List<FreePassDTO> freePassList = freePassMapper.selectFreePassListByKusid(kusid);
            // ✅ 프리패스 사용일 조회
            List<ResPassUsageDTO> freePassUsageList = freePassMapper.selectUsedDatesByKusid(kusid);

            // ✅ 정기권: 결제 내역 + 옵션 조회
            List<SeasonTicketDTO> seasonTicketList = seasonTicketMapper.selectSeasonTicketListByKusid(kusid);
            // ✅ 정기권 사용일 조회
            List<ResSeasonUsageDTO> seasonTicketUsageList = seasonTicketMapper.selectUsedDatesByKusid(kusid);

            int total = (freePassList != null ? freePassList.size() : 0) + 
                        (seasonTicketList != null ? seasonTicketList.size() : 0);

            result.put("prdListCnt", total);
            result.put("adntPrdList", mergeResult(freePassList, seasonTicketList)); // 하나의 리스트로 합쳐서 JS에서 구분
            result.put("adntTimDteList", freePassUsageList); // 프리패스 사용일만
            result.put("timDteListCnt", freePassUsageList != null ? freePassUsageList.size() : 0);
            result.put("MSG_CD", "S0000");

        } catch (Exception e) {
            result.put("prdListCnt", 0);
            result.put("MSG_CD", "E9999");
        }

        return result;
    }

    // 정기권/프리패스를 통합해서 보내기 위한 리스트 merge
    private List<Map<String, Object>> mergeResult(List<FreePassDTO> freeList, List<SeasonTicketDTO> seasonList) {
        List<Map<String, Object>> merged = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");

        // ✅ 프리패스
        if (freeList != null) {
            for (FreePassDTO dto : freeList) {
                Map<String, Object> map = new HashMap<>();
                map.put("ADTN_CPN_NO", dto.getAdtnPrdSno());
                map.put("ADTN_PRD_KND_CD", "3");
                map.put("ADTN_PRD_USE_PSB_DNO", dto.getAdtnPrdUsePsbDno());
                map.put("wkdWkeNtknNm", dto.getWkdWkeNtknNm());
                map.put("adtnPrdUseClsNm", dto.getAdtnPrdUseClsNm());

                Date startDate = dto.getStartDate();
                String endDtStr = null;
                try {
                	int days = dto.getAdtnPrdUsePsbDno(); // ✅ 이미 int라 바로 사용
                    if (startDate != null && days > 0) {
                        Calendar cal = Calendar.getInstance();
                        cal.setTime(startDate);
                        cal.add(Calendar.DATE, days - 1);
                        endDtStr = sdf.format(cal.getTime());
                    }
                } catch (Exception e) {
                    endDtStr = null;
                }
                map.put("EXDT_STT_DT", sdf.format(startDate));
                map.put("EXDT_END_DT", endDtStr);

                map.put("adtnPrdUseNtknNm", dto.getAdtnPrdUseNtknNm());
                map.put("PUB_USER_NO", dto.getKusid());
                merged.add(map);
            }
        }

        // ✅ 정기권
        if (seasonList != null) {
            for (SeasonTicketDTO dto : seasonList) {
                Map<String, Object> map = new HashMap<>();
                map.put("ADTN_CPN_NO", dto.getAdtnPrdSno());
                map.put("ADTN_PRD_KND_CD", "2");
                map.put("ADTN_PRD_USE_PSB_DNO", dto.getAdtnPrdUsePsbDno());
                map.put("wkdWkeNtknNm", dto.getWkdWkeNtknNm());
                map.put("adtnPrdUseClsNm", dto.getAdtnPrdUseClsNm());

                Date startDate = dto.getStartDate();
                String endDtStr = null;
                try {
                    if (startDate != null && dto.getAdtnPrdUsePsbDno() != null) {
                        int days = Integer.parseInt(dto.getAdtnPrdUsePsbDno());
                        if (days > 0) {
                            Calendar cal = Calendar.getInstance();
                            cal.setTime(startDate);
                            cal.add(Calendar.DATE, days - 1);
                            endDtStr = sdf.format(cal.getTime());
                        }
                    }
                } catch (Exception e) {
                    endDtStr = null;
                }
                map.put("EXDT_STT_DT", sdf.format(startDate));
                map.put("EXDT_END_DT", endDtStr);

                map.put("adtnPrdUseNtknNm", dto.getAdtnPrdUseNtknNm());
                map.put("PUB_USER_NO", dto.getKusid());
                merged.add(map);
            }
        }

        return merged;
    }

}
