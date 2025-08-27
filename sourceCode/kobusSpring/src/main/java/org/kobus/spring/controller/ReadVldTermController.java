package org.kobus.spring.controller;


import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.kobus.spring.domain.pay.FrpsTermDTO;
import org.kobus.spring.mapper.pay.TermMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/adtnprdnew/frps")
public class ReadVldTermController {

    @Autowired
    private TermMapper termMapper;
    
    @PostMapping("/readFrpsDtlInf.ajax")
    public Map<String, Object> getAllFreePassOptions() {
        System.out.println("📌 [GET] 프리패스 옵션 목록 조회 시작");

        List<FrpsTermDTO> optionList = termMapper.frpsOptionList();

        System.out.println("✅ 조회된 옵션 개수: " + optionList.size());

        for (FrpsTermDTO dto : optionList) {
            System.out.println("   - 옵션: [" + dto.getAdtnPrdSno() + "] "
                + dto.getAdtnPrdUseClsNm() + " / " + dto.getAdtnPrdUseNtknNm());
        }

        Map<String, Object> result = new HashMap<>();
        result.put("adtnDtlList", optionList);
        result.put("len", optionList.size());

        System.out.println("📤 JSON 응답 완료 (옵션 개수: " + optionList.size() + ")");
        return result;
    }

    @PostMapping("/readFrpsVldTerm.ajax")
    public Map<String, Object> readFrpsVldTerm(
            @RequestParam("selOption") String selOption,
            @RequestParam("startDate") String startDate,
            @RequestParam("period") String periodStr
    ) {
        Map<String, Object> result = new HashMap<>();
        try {
            // 1. 기본 출력
            System.out.println("📌 readFrpsVldTerm 호출");
            System.out.println("selOption = " + selOption);
            System.out.println("startDate = " + startDate);
            System.out.println("period = " + periodStr);

            if (selOption == null || startDate == null || periodStr == null) {
                result.put("rcvMsgNm", "선택 옵션, 시작일 또는 기간이 없습니다.");
                result.put("rotAllCnt", 0);
                return result;
            }

            String[] parts = selOption.split("/");
            String passTypeCd = parts[0];
            boolean isWeekdayOnly = "2".equals(passTypeCd);
            int periodDays = Integer.parseInt(periodStr);

            List<String> validDateList = getValidDates(startDate, periodDays, isWeekdayOnly);

            if (validDateList.isEmpty()) {
                result.put("rcvMsgNm", "기간 계산 결과가 없습니다.");
                result.put("rotAllCnt", 0);
                return result;
            }

            String endDate = validDateList.get(validDateList.size() - 1).replace(".", "");
            String fulTerm = String.join("/", validDateList);

            // 금액 조회
            String adtnPrdSno = parts[parts.length - 1];
            int pubAmt = termMapper.getAmountBySno(adtnPrdSno); // MyBatis Mapper 호출

            result.put("termSttDt", startDate);
            result.put("timDte", endDate);
            result.put("fulTerm", fulTerm);
            result.put("pubAmt", pubAmt);
            result.put("rotAllCnt", 1);
            result.put("adtnDupPrchYn", "N");

        } catch (Exception e) {
            e.printStackTrace();
            result.put("rcvMsgNm", "서버 오류");
            result.put("rotAllCnt", 0);
        }
        return result;
    }

    // ✅ 기존 getValidDates 그대로 복사해도 됨 (private 메서드)
    private List<String> getValidDates(String startDateStr, int period, boolean isWeekdayOnly) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat sdfOut = new SimpleDateFormat("yyyy.MM.dd");
        SimpleDateFormat sdfDay = new SimpleDateFormat("dd");
        Date startDate = sdf.parse(startDateStr);
        Calendar cal = Calendar.getInstance();
        cal.setTime(startDate);

        List<String> result = new ArrayList<>();
        int count = 0;

        while (count < period) {
            int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
            if (isWeekdayOnly) {
                if (dayOfWeek >= Calendar.MONDAY && dayOfWeek <= Calendar.THURSDAY) {
                    result.add(count == 0 ? "<span class='term-highlight'>" + sdfOut.format(cal.getTime()) + "</span>"
                                          : "<span class='term-highlight'>" + sdfDay.format(cal.getTime()) + "</span>");
                    count++;
                }
            } else {
                result.add(count == 0 ? "<span class='term-highlight'>" + sdfOut.format(cal.getTime()) + "</span>"
                                      : "<span class='term-highlight'>" + sdfDay.format(cal.getTime()) + "</span>");
                count++;
            }
            cal.add(Calendar.DATE, 1);
        }
        return result;
    }
} // class