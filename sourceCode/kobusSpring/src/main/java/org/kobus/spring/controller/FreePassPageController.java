package org.kobus.spring.controller;

import java.sql.Date;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.kobus.spring.mapper.pay.BusReservationMapper;
import org.kobus.spring.mapper.reservation.SeatMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/payment")
public class FreePassPageController {
	
	@Autowired
    private SeatMapper seatMapper; // SeatMapper.xml
	
	@Autowired
    private BusReservationMapper reservationMapper;
	
	/*
	@Autowired
    private LogonMapper logonMapper; // LogonMapper.xml
	*/
    @GetMapping("/buspay.htm")
    public String showBusPayForm() {
    	System.out.println(">>>>>>   http://localhost/payment/buspay.htm 요청." );
        return "kobus.payment/buspay";  // Tiles 와일드카드 규칙에 맞는 이름
    }
    
    // 2. 좌석 선택 후 결제정보 POST 전송될 때
    @PostMapping("/buspay.htm")
    public String handleBusPayPost(HttpServletRequest request, Model model) {
    	System.out.println(">>>>>> POST  http://localhost/payment/buspay.htm 요청." );
    	// 임시 하드코딩 처리 (로그인 세션 생략)
    	/*
    	String loginId = "testuser";  // 하드코딩된 로그인 ID
    	String userPK = "KUS123456";  // 하드코딩된 사용자 PK
    	*/
    	/* 로그인 부분
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("id") == null) {
            return "redirect:/koBus/koBusFile/logonMain.jsp";
        }

        String loginId = (String) session.getAttribute("id");
        String userPK = logonMapper.getKusIDById(loginId); // LogonMapper 사용
    	*/
        String deprCd = request.getParameter("deprCd");
        String deprDtRaw = request.getParameter("deprDtm");
        String deprTime = request.getParameter("deprTime");
        String deprNm = request.getParameter("deprNm");
        String arvlNm = request.getParameter("arvlNm");
        String takeDrtmOrg = request.getParameter("takeDrtmOrg");

        String cacmCd = request.getParameter("cacmCd");
        String cacmNm = request.getParameter("cacmNm");
        String indVBusClsCd = request.getParameter("indVBusClsCd");

        String selAdltCnt = request.getParameter("selAdltCnt");
        String selChldCnt = request.getParameter("selChldCnt");
        String selTeenCnt = request.getParameter("selTeenCnt");

        String selectedSeatIds = request.getParameter("selectedSeatIds");
        String selSeatNum = request.getParameter("selSeatNum");
        String selSeatCnt = request.getParameter("selSeatCnt");
        String allTotAmtPrice = request.getParameter("allTotAmtPrice");
        String busCode = request.getParameter("bshId");
        String changeResId = request.getParameter("changeResId");

        String deprDt = deprDtRaw;
        String deprDtFmt = deprDtRaw.substring(0, 10).replace("-", ".");

        String deprTimeFmt = deprTime;

        String fullDateTime = deprDtRaw + ":00";
        
        System.out.println("deprDt " + deprDt);
        System.out.println("deprDtFmt " + deprDtFmt);
        System.out.println("deprTimeFmt " + deprTimeFmt);
        System.out.println("fullDateTime " + fullDateTime);
        System.out.println("changeResId " + changeResId);
        System.out.println("busCode " + busCode);
        
        /* changeReservation 예시 -> UPDATE reservation SET resv_status = '취소' WHERE res_id = #{resId} */

        // 좌석 ID 파싱
        Pattern pattern = Pattern.compile("SEAT\\d+");
        Matcher matcher = pattern.matcher(selectedSeatIds);
        List<String> seatIdList = new ArrayList<>();
        while (matcher.find()) {
            seatIdList.add(matcher.group());
        }
        String seatNos = "";
		try {
			seatNos = seatMapper.searchSeatId(seatIdList);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} // SeatMapper 사용
		
		
		selectedSeatIds = String.join(",", seatIdList);

        System.out.println("seatIdsStr " + selectedSeatIds);

        String resId = reservationMapper.generateResId(); // ReservationMapper 사용
        /* generateResId -> SELECT SEQ_RESERVATION.NEXTVAL FROM DUAL */
        
        

        model.addAttribute("resId", resId);
        model.addAttribute("changeResId", changeResId);
        model.addAttribute("seatNos", seatNos);
        model.addAttribute("selectedSeatIds", selectedSeatIds);
        model.addAttribute("deprCd", deprCd);
        model.addAttribute("deprDt", deprDt);
        model.addAttribute("deprTime", deprTime);
        model.addAttribute("deprNm", deprNm);
        model.addAttribute("arvlNm", arvlNm);
        model.addAttribute("cacmCd", cacmCd);
        model.addAttribute("cacmNm", cacmNm);
        model.addAttribute("indVBusClsCd", indVBusClsCd);
        model.addAttribute("selAdltCnt", selAdltCnt);
        model.addAttribute("selChldCnt", selChldCnt);
        model.addAttribute("selTeenCnt", selTeenCnt);
        model.addAttribute("selSeatNum", selSeatNum);
        model.addAttribute("selSeatCnt", selSeatCnt);
        model.addAttribute("estmAmt", allTotAmtPrice);
        model.addAttribute("tissuAmt", allTotAmtPrice);
        model.addAttribute("takeDrtmOrg", takeDrtmOrg);
        model.addAttribute("deprTimeFmt", deprTimeFmt);
        model.addAttribute("deprDtFmt", deprDtFmt);
        model.addAttribute("busCode", busCode);

        return "kobus.payment/buspay"; // 타일즈 뷰 이름
    }

    
    @GetMapping("/freepass.htm")
    public String showFreePassForm() {
    	System.out.println(">>>>>>   http://localhost/payment/freepass.htm 요청." );
        return "kobus.payment/freepass";  // Tiles 와일드카드 규칙에 맞는 이름
        
        // return "payment/freePass";
        //  http://localhost/payment/freepass.htm 요청
    }
    
    @GetMapping("/seasonticket.htm")
    public String showSeasonTicketForm() {
    	System.out.println(">>>>>>   http://localhost/payment/seasonticket.htm 요청." );
        return "kobus.payment/seasonticket";  // Tiles 와일드카드 규칙에 맞는 이름
    }
    /*
    @GetMapping("/reservCompl.htm")
    public String showReservComplForm() {
    	System.out.println(">>>>>>   http://localhost/payment/reservCompl.htm 요청." );
        return "kobus.payment/reservCompl";  // Tiles 와일드카드 규칙에 맞는 이름
    }
    */
    @GetMapping("/reservCompl.htm")
    public String showReservationComplete(HttpServletRequest request) {

        // 1. 파라미터 수집
        String resId = request.getParameter("resId");
        String changeResId = request.getParameter("changeResId");
        
        String deprDtRaw = request.getParameter("deprDt");
        String deprTime = request.getParameter("deprTime");

        String deprNm = request.getParameter("deprNm");
        String arvlNm = request.getParameter("arvlNm");
        String takeDrtmOrg = request.getParameter("takeDrtmOrg");

        String cacmNm = request.getParameter("cacmNm");
        String indVBusClsCd = request.getParameter("indVBusClsCd");
        String selSeatCnt = request.getParameter("selSeatCnt");
        String seatNos = request.getParameter("seatNos");

        String selAdltCnt = request.getParameter("selAdltCnt");
        String selTeenCnt = request.getParameter("selTeenCnt");
        String selChldCnt = request.getParameter("selChldCnt");

        String payMethod = request.getParameter("payMethod");
        String amountStr = request.getParameter("amount");

        // 3. 소요시간 변환
        String durationStr;
        try {
            int durationMin = Integer.parseInt(takeDrtmOrg);
            int hours = durationMin / 60;
            int minutes = durationMin % 60;
            durationStr = (hours > 0 ? hours + "시간 " : "") + minutes + "분";
        } catch (Exception e) {
            durationStr = "소요시간 오류";
        }

        // 4. 결제일시
        String paidAtStr = new SimpleDateFormat("yyyy.MM.dd (E) HH:mm", Locale.KOREA).format(new java.util.Date());

        // 5. 탑승객 요약
        int adlt = Integer.parseInt(selAdltCnt == null ? "0" : selAdltCnt);
        int teen = Integer.parseInt(selTeenCnt == null ? "0" : selTeenCnt);
        int chld = Integer.parseInt(selChldCnt == null ? "0" : selChldCnt);

        String buyerSummary = (adlt > 0 ? "일반 " + adlt + "명 " : "") +
                              (teen > 0 ? "청소년 " + teen + "명 " : "") +
                              (chld > 0 ? "어린이 " + chld + "명" : "");

        // 6. request에 저장
        request.setAttribute("resId", resId);
        request.setAttribute("changeResId", changeResId);
        request.setAttribute("deprNm", deprNm);
        request.setAttribute("arvlNm", arvlNm);
        request.setAttribute("takeDrtmOrg", takeDrtmOrg);
        request.setAttribute("durationStr", durationStr);

        request.setAttribute("cacmNm", cacmNm);
        request.setAttribute("indVBusClsCd", indVBusClsCd);
        request.setAttribute("selSeatCnt", selSeatCnt);
        request.setAttribute("seatNos", seatNos);
        request.setAttribute("payMethod", payMethod);
        request.setAttribute("amount", amountStr);

        request.setAttribute("deprDtTimeFmt", deprDtRaw);
        request.setAttribute("paidAtStr", paidAtStr);
        request.setAttribute("buyerSummary", buyerSummary.trim());

        // Tiles 설정에 따라 뷰 이름 반환
        return "kobus.payment/reservCompl";
    }
    
} // class

