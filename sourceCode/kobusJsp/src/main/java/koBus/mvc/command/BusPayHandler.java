package koBus.mvc.command;

import java.sql.Connection;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.util.ConnectionProvider;

import koBus.mvc.domain.ReservationDTO;
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

        // 2. 날짜/시간 포맷
        String deprDtFmt = "";
        if (deprDtRaw  != null && deprDtRaw.length() == 8) {
            deprDtFmt = deprDtRaw.substring(0, 4) + "." + deprDtRaw.substring(4, 6) + "." + deprDtRaw.substring(6, 8);
        }

        String deprTimeFmt = "";
        if (deprTime != null && deprTime.length() == 6) {
            deprTimeFmt = deprTime.substring(0, 2) + ":" + deprTime.substring(2, 4);
        }

        // 3. 커넥션 및 DAO 준비
        Connection conn = ConnectionProvider.getConnection();
        SeatDAO seatDao = new SeatDAOImpl(conn);
        ReservationDAO dao = new ReservationDAO();
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

        // 5. RES_ID 생성


        // 6. 예매 DTO 구성
        ReservationDTO reservation = new ReservationDTO();
        reservation.setResID(resId);
        reservation.setBshID(request.getParameter("bshId")); // 운행 ID
        reservation.setSeatID(seatIds);                     // 좌석 번호 (7,8,...)
        reservation.setKusID("KUS004");                  // 임시 사용자 ID
        reservation.setRideDate(Date.valueOf(deprDt));      // 탑승일자
        reservation.setResvDate(new Date(System.currentTimeMillis())); // 예매일자
        reservation.setResvStatus("결제대기");
        reservation.setResvType("일반");
        reservation.setQrCode((int)(Math.random() * 999999));
        reservation.setMileage(0);
        reservation.setSeatAble("Y");


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

        // 9. 페이지 이동
        return "/koBusFile/busPay.jsp";
    }
}
