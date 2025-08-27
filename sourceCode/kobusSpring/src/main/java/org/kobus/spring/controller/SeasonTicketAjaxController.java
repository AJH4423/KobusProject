package org.kobus.spring.controller;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.kobus.spring.domain.pay.FreePassDTO;
import org.kobus.spring.mapper.pay.FreePassMapper;
import org.kobus.spring.mapper.pay.SeasonTicketMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/mrs/pay")
public class SeasonTicketAjaxController {

    @Autowired
    private SeasonTicketMapper seasonTicketMapper; // Mapper 주입
    
    @Autowired
    private FreePassMapper freePassMapper;

    @PostMapping("/useSeasonTicket.do")
    @ResponseBody
    public Map<String, Object> checkUsage(HttpServletRequest request) {
        Map<String, Object> result = new HashMap<>();

        String adtnPrdSno = request.getParameter("adtnPrdSno");
        String usedDate = request.getParameter("usedDate");

        if (adtnPrdSno == null || usedDate == null) {
            result.put("status", "error");
            result.put("message", "필수 파라미터 누락");
            return result;
        }

        int count = seasonTicketMapper.countUsagePerDay(adtnPrdSno, usedDate);

        result.put("status", "success");
        result.put("usageCount", count);
        return result;
    }
    
    @PostMapping("/useFreePass.do")
    @ResponseBody
    public Map<String, Object> useFreePass(HttpServletRequest request) {
        Map<String, Object> result = new HashMap<>();

        try {
            String adtnCpnNo = request.getParameter("adtnCpnNo"); // 프리패스 번호
            String usedDate = request.getParameter("usedDate");   // 예매일자 (yyyyMMdd)
            String kusid = (String) request.getSession().getAttribute("kusid");

            if (kusid == null || adtnCpnNo == null || usedDate == null) {
                result.put("result", "FAIL");
                result.put("message", "필수 정보 누락");
                return result;
            }

            // 1. 프리패스 유효 여부 확인
            FreePassDTO pass = freePassMapper.selectFreePassByCpnNo(adtnCpnNo);
            if (pass == null || !kusid.equals(pass.getKusid())) {
                result.put("result", "FAIL");
                result.put("message", "프리패스 정보가 유효하지 않습니다.");
                return result;
            }

            // 2. 날짜 범위 확인
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            Date ride = (Date) sdf.parse(usedDate);
            Date start = pass.getStartDate();
            Calendar cal = Calendar.getInstance();
            cal.setTime(start);
            cal.add(Calendar.DATE, pass.getAdtnPrdUsePsbDno() - 1);
            Date end = (Date) cal.getTime();

            if (ride.before(start) || ride.after(end)) {
                result.put("result", "FAIL");
                result.put("message", "사용기간에 포함되지 않은 날짜입니다.");
                return result;
            }

            // 3. 예매 저장
            // (1) reservation insert
            freePassMapper.insertReservationForFreePass(pass, usedDate, kusid);


            result.put("result", "SUCCESS");
        } catch (Exception e) {
            result.put("result", "FAIL");
            result.put("message", "서버 오류: " + e.getMessage());
        }

        return result;
    }
}
