package koBus.mvc.command;

import java.sql.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import koBus.mvc.domain.BusPaymentDTO;
import koBus.mvc.domain.BusReservationDTO;
import koBus.mvc.persistence.BusPaymentDAO;
import koBus.mvc.persistence.BusReservationDAO;

public class SavePaymentHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        request.setCharacterEncoding("UTF-8");

        // 1. 결제 데이터 수신
        String imp_uid = request.getParameter("imp_uid");
        String merchant_uid = request.getParameter("merchant_uid");
        String pay_method = request.getParameter("pay_method");
        String amountStr = request.getParameter("amount");
        String pay_status = request.getParameter("pay_status");
        String pg_tid = request.getParameter("pg_tid");
        String paid_at_str = request.getParameter("paid_at");
        String user_id = request.getParameter("user_id"); // JS에서 추가된 항목
        String resId = request.getParameter("resId"); // 또는 req.getParameter("resID")
        System.out.println("✅ 받은 resId: " + resId);
        
        System.out.println("🟡 받은 paid_at 값: " + paid_at_str);
        System.out.println("🟡 받은 amountStr 값: " + amountStr);


        int amount = Integer.parseInt(amountStr);

        // paid_at 변환: UNIX timestamp (초 단위) → java.sql.Date
        long paidAtMillis = Long.parseLong(paid_at_str) * 1000L;
        Date paid_at = new Date(paidAtMillis);

        // 2. DTO 생성 및 설정
        BusPaymentDTO dto = new BusPaymentDTO();
        dto.setUserId(user_id);
        dto.setImpUid(imp_uid);
        dto.setMerchantUid(merchant_uid);
        dto.setPayMethod(pay_method);
        dto.setAmount(amount);
        dto.setPayStatus(pay_status);
        dto.setPgTid(pg_tid);
        dto.setPaidAt(paid_at);
        dto.setResId(resId);

        // 3. DAO 호출
        BusPaymentDAO dao = new BusPaymentDAO();
        int result = dao.insertPayment(dto);
        
     // ✅ 여기에 예매 정보 insert 추가
        BusReservationDTO rDto = new BusReservationDTO();
        rDto.setUserId(user_id);
        rDto.setBusScheduleId(request.getParameter("bus_schedule_id"));
        rDto.setSeatNumber(request.getParameter("seat_number"));
        rDto.setBoardingDt(Date.valueOf(request.getParameter("boarding_dt")));
        rDto.setTotalPrice(amount); // 결제 금액 그대로 사용

        BusReservationDAO rDao = new BusReservationDAO();
        int rResult = rDao.insertReservation(rDto);

        // 4. 응답 반환
        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write("{\"result\": " + ((result == 1 && rResult == 1) ? 1 : 0) + "}");

        return null; // AJAX 처리이므로 null 반환
    }
}