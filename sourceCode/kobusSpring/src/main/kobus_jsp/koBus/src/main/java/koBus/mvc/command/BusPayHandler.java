package koBus.mvc.command;

import java.sql.Connection;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.util.ConnectionProvider;

import koBus.mvc.domain.ReservationDTO;
import koBus.mvc.persistence.LogonDAO;
import koBus.mvc.persistence.LogonDAOImpl;
import koBus.mvc.persistence.ReservationDAO;
import koBus.mvc.persistence.SeatDAO;
import koBus.mvc.persistence.SeatDAOImpl;

public class BusPayHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 1. 파라미터 수집
        String deprCd = request.getParameter("deprCd");
        
        String deprDtRaw = request.getParameter("deprDt"); // "20250625"
        String deprDt = deprDtRaw.substring(0, 4) + "-" + deprDtRaw.substring(4, 6) + "-" + deprDtRaw.substring(6, 8);
        
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

        String selectedSeatIds = request.getParameter("selectedSeatIds"); // 예: seatNum_SEAT043,seatNum_SEAT044
        String selSeatNum = request.getParameter("selSeatNum"); // 예: "7,8"
        String selSeatCnt = request.getParameter("selSeatCnt");
        String allTotAmtPrice = request.getParameter("allTotAmtPrice");
        String busCode = request.getParameter("busCode");
        
        String changeResId = request.getParameter("resId");
        
        
        
        System.out.println("changeResId " + changeResId);
        
        

        // 2. 날짜/시간 포맷
        String deprDtFmt = "";
        if (deprDtRaw  != null && deprDtRaw.length() == 8) {
            deprDtFmt = deprDtRaw.substring(0, 4) + "." + deprDtRaw.substring(4, 6) + "." + deprDtRaw.substring(6, 8);
        }

        String deprTimeFmt = "";

        if (deprTime != null && deprTime.length() == 6) {
            // 기존 조건: "HHmmss" → "HH:mm"
            deprTimeFmt = deprTime.substring(0, 2) + ":" + deprTime.substring(2, 4);
        } else if (deprTime != null && deprTime.contains(":")) {
            // 추가 조건: "HH:mm" 형식이면 그대로 사용
            deprTimeFmt = deprTime;
        }
        
        System.out.println("deprTimeFmt " + deprTimeFmt);

        HttpSession session = request.getSession(false);
		
		 if (session == null || session.getAttribute("id") == null) {
		        // 로그인 안 된 상태
		        response.sendRedirect("/koBus/koBusFile/logonMain.jsp");
		        return null;
		}

        // 3. 커넥션 및 DAO 준비
        Connection conn = ConnectionProvider.getConnection();
        SeatDAO seatDao = new SeatDAOImpl(conn);
        ReservationDAO dao = new ReservationDAO();
        
        String loginId = (String) session.getAttribute("id");
        LogonDAO logonDao = new LogonDAOImpl(conn);
        
        String userPK = logonDao.getKusIDById(loginId);
        
        int delete = 0;
        
        if (changeResId != null && !changeResId.equals("") && !changeResId.equals("undefined")) {
            delete = dao.changeReservation(changeResId);
        }
        
        String resId = dao.generateResId();


        // 4. 좌석 ID 문자열에서 seat번호 추출
        Pattern pattern = Pattern.compile("SEAT\\d+");
        Matcher matcher = pattern.matcher(selectedSeatIds);

        List<String> seatIdList = new ArrayList<>();
        while (matcher.find()) {
            seatIdList.add(matcher.group());
        }

        String seatNos = seatDao.searchSeatId(seatIdList); // "7,8,15"
        if (seatNos == null || seatNos.isEmpty()) {
            System.out.println("조회된 좌석 번호가 없습니다.");
        } else {
            System.out.println("좌석 번호들: " + seatNos);
        }
        String seatIds = String.join(",", seatIdList);
        
        String fullDateTime = deprDt + " " + (deprTimeFmt.length() == 5 ? deprTimeFmt + ":00" : deprTimeFmt);

        Timestamp rideDateTime = Timestamp.valueOf(fullDateTime);

        // 5. RES_ID 생성
        
        
        System.out.println("deprDt " + deprDt);


        // 6. 예매 DTO 구성
        ReservationDTO reservation = new ReservationDTO();
        reservation.setResID(resId);
        reservation.setBshID(request.getParameter("busCode")); // 운행 ID
        reservation.setSeatID(seatIds);                     // 좌석 번호 (7,8,...)
        reservation.setKusID(userPK);                   // 임시 사용자 ID
        reservation.setRideDate(rideDateTime);       // 탑승일자
        reservation.setResvDate(new Date(System.currentTimeMillis())); // 예매일자
        reservation.setResvStatus("결제완료");
        reservation.setResvType("일반");
        reservation.setQrCode((int)(Math.random() * 999999));
        reservation.setMileage(0);
        reservation.setSeatAble("Y");
        reservation.setBusCode(busCode);


        // 7. INSERT 수행
        boolean success = dao.insertReservation(reservation);
        if (!success) {
            System.out.println("[BusPayHandler] 예매 정보 저장 실패");
            request.setAttribute("error", "예매 정보 저장 중 오류 발생");
            return "/koBus/error.jsp";
        }

        // 8. JSP로 전달할 값 설정
        request.setAttribute("resId", resId);
        request.setAttribute("seatNos", seatNos);

        request.setAttribute("deprCd", deprCd);
        request.setAttribute("deprDt", deprDt);
        request.setAttribute("deprTime", deprTime);
        request.setAttribute("deprNm", deprNm);
        request.setAttribute("arvlNm", arvlNm);
        request.setAttribute("cacmCd", cacmCd);
        request.setAttribute("cacmNm", cacmNm);
        request.setAttribute("indVBusClsCd", indVBusClsCd);

        request.setAttribute("selAdltCnt", selAdltCnt);
        request.setAttribute("selChldCnt", selChldCnt);
        request.setAttribute("selTeenCnt", selTeenCnt);
        request.setAttribute("selSeatNum", selSeatNum);
        request.setAttribute("selSeatCnt", selSeatCnt);
        request.setAttribute("estmAmt", allTotAmtPrice);
        request.setAttribute("tissuAmt", allTotAmtPrice);
        request.setAttribute("takeDrtmOrg", takeDrtmOrg);
        request.setAttribute("deprTimeFmt", deprTimeFmt);
        request.setAttribute("deprDtFmt", deprDtFmt);
        request.setAttribute("busCode", busCode);

        // 9. 페이지 이동
        return "/koBusFile/busPay.jsp";
    }
}
