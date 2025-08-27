package koBus.mvc.command;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Random;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import koBus.mvc.domain.PaymentDTO;
import koBus.mvc.domain.ReservationDTO;
import koBus.mvc.persistence.PaymentDAO;

public class PaymentSaveHandler implements CommandHandler {
    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // ========== [로그인 정보 확인] ==========
        String userId = (String) request.getSession().getAttribute("userId");
        if (userId == null) {
            userId = "KUS003"; // ★ 테스트용
        }
        System.out.println("[PaymentSaveHandler] userId: " + userId);

        // ========== [결제 파라미터 추출 및 로그] ==========
        String impUid = request.getParameter("imp_uid");
        String merchantUid = request.getParameter("merchant_uid");
        String payMethod = request.getParameter("pay_method");
        String amountStr = request.getParameter("amount");
        String payStatus = request.getParameter("pay_status");
        String pgTid = request.getParameter("pg_tid");
        String paidAtStr = request.getParameter("paid_at");

        // 🔹 추가 파라미터
        String adtnPrdSno = request.getParameter("adtnPrdSno");
        String routeId = request.getParameter("routeId");
        String startDateStr = request.getParameter("startDate");

        System.out.println("[PaymentSaveHandler] imp_uid: " + impUid);
        System.out.println("[PaymentSaveHandler] merchant_uid: " + merchantUid);
        System.out.println("[PaymentSaveHandler] pay_method: " + payMethod);
        System.out.println("[PaymentSaveHandler] amount: " + amountStr);
        System.out.println("[PaymentSaveHandler] pay_status: " + payStatus);
        System.out.println("[PaymentSaveHandler] pg_tid: " + pgTid);
        System.out.println("[PaymentSaveHandler] paid_at: " + paidAtStr);
        System.out.println("[PaymentSaveHandler] adtnPrdSno: " + adtnPrdSno);
        System.out.println("[PaymentSaveHandler] routeId: " + routeId);
        System.out.println("[PaymentSaveHandler] startDateStr: " + startDateStr);

        // ========== [결제금액 파싱] ==========
        int amount = 0;
        try {
            amount = Integer.parseInt(amountStr);
        } catch (Exception e) {
            System.out.println("[PaymentSaveHandler][ERROR] amount 파싱 실패: " + amountStr);
            response.setStatus(400);
            response.getWriter().write("금액 오류");
            return null;
        }

        // ========== [startDate 변환] ==========
        Date startDate = null;
        if (startDateStr != null && !startDateStr.isEmpty()) {
            try {
                startDate = Date.valueOf(startDateStr);
                System.out.println("[PaymentSaveHandler] 변환된 startDate: " + startDate);
            } catch (Exception e) {
                System.out.println("[PaymentSaveHandler][ERROR] startDate 변환 실패: " + e.getMessage());
            }
        }

        // ========== [paidAt 변환] ==========
        Date paidAt = null;
        if (paidAtStr != null && !paidAtStr.isEmpty()) {
            try {
                long paidAtMillis = Long.parseLong(paidAtStr) * 1000L;
                paidAt = new java.sql.Date(paidAtMillis);
                System.out.println("[PaymentSaveHandler] 변환된 paidAt(java.sql.Date): " + paidAt);
            } catch (Exception e) {
                System.out.println("[PaymentSaveHandler][ERROR] paidAt 변환 실패! " + e.getMessage());
            }
        }

        // ========== [결제 DTO 생성 및 로그] ==========
        PaymentDTO payDto = new PaymentDTO();
        payDto.setUserId(userId);
        payDto.setImpUid(impUid);
        payDto.setMerchantUid(merchantUid);
        payDto.setPayMethod(payMethod);
        payDto.setAmount(amount);
        payDto.setPayStatus(payStatus);
        payDto.setPgTid(pgTid);
        payDto.setPaidAt(paidAt);
        payDto.setAdtnPrdSno(adtnPrdSno);   // 추가
        payDto.setRouteId(routeId);         // 추가
        payDto.setStartDate(startDate);     // 추가

        System.out.println("[PaymentSaveHandler] PaymentDTO: " + payDto);

        // ========== [예매 파라미터 추출 및 로그] ==========
        String bshID = request.getParameter("bshID");
        String seatID = request.getParameter("seatID");
        String rideDateStr = request.getParameter("rideDate");
        String resvType = request.getParameter("resvType");

        int mileage = 0;
        try {
            String mileageStr = request.getParameter("mileage");
            if (mileageStr != null) mileage = Integer.parseInt(mileageStr);
        } catch (Exception e) {
            mileage = 0;
        }

        System.out.println("[PaymentSaveHandler] bshID: " + bshID);
        System.out.println("[PaymentSaveHandler] seatID: " + seatID);
        System.out.println("[PaymentSaveHandler] rideDate: " + rideDateStr);
        System.out.println("[PaymentSaveHandler] resvType: " + resvType);
        System.out.println("[PaymentSaveHandler] mileage: " + mileage);

        // ========== [예매 DTO 생성] ==========
        String resID = UUID.randomUUID().toString();
        Date rideDate = (rideDateStr != null && !rideDateStr.isEmpty()) ? Date.valueOf(rideDateStr) : new Date(System.currentTimeMillis());
        Date resvDate = new Date(System.currentTimeMillis());
        String resvStatus = "결제완료";
        String seatAble = "Y";
        int qrCode = (int) (Math.random() * 900000) + 100000;
        String today = new SimpleDateFormat("yyyyMMdd").format(new java.util.Date());
        int randomNum = 100000 + new Random().nextInt(900000);
        String reservationNo = today + randomNum;

        ReservationDTO resvDto = new ReservationDTO();
        resvDto.setResID(resID);
        resvDto.setBshID(bshID);
        resvDto.setSeatID(seatID);
        resvDto.setKusID(userId);
        resvDto.setRideDate(new Timestamp(rideDate.getTime()));
        resvDto.setResvDate(resvDate);
        resvDto.setResvStatus(resvStatus);
        resvDto.setResvType(resvType);
        resvDto.setQrCode(qrCode);
        resvDto.setMileage(mileage);
        resvDto.setSeatAble(seatAble);

        System.out.println("[PaymentSaveHandler] ReservationDTO: " + resvDto);
        System.out.println("생성된 예매번호: " + reservationNo);

        // ========== [결제/예매 DB 저장] ==========
        PaymentDAO dao = new PaymentDAO();
        boolean result = false;
        try {
            result = dao.insertPaymentAndReservation(payDto, resvDto);
            System.out.println("[PaymentSaveHandler] DB저장 결과: " + result);
        } catch (Exception e) {
            System.out.println("[PaymentSaveHandler][ERROR] DB 저장 중 예외: " + e.getMessage());
            e.printStackTrace();
        }

        // ========== [결과 반환] ==========
        response.setContentType("application/json;charset=UTF-8");
        if (result) {
            System.out.println("[PaymentSaveHandler] 결제/예매 저장 성공! 응답 반환");
            response.getWriter().write("{\"result\":\"ok\"}");
        } else {
            System.out.println("[PaymentSaveHandler][ERROR] 결제/예매 저장 실패! 응답 반환");
            response.setStatus(500);
            response.getWriter().write("{\"result\":\"fail\"}");
        }

        return null; // AJAX 응답이므로 forward 없음
    }
}
