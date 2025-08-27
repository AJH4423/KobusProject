package koBus.mvc.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Date;
import java.text.SimpleDateFormat;

import koBus.mvc.domain.FreePassPaymentDTO;
import koBus.mvc.persistence.FreePassPaymentDAO;

public class FrpsPaymentSaveHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	// 0. 세션 로그인 체크
        
    	// 임시 결제 db저장 확인용 로그인값(합칠땐 지우고 위 로그인 인증코드 활성화!)
        String userId = (String) request.getSession().getAttribute("userId");
        if (userId == null) {
            // ★ 테스트용! 실제 배포 전엔 꼭 삭제
            userId = "KUS003"; // 또는 실제 존재하는 아이디
        }
    	
    	try {
            // 1. 필수 파라미터 받기
            // String userId = request.getParameter("user_id");
            String adtnPrdSno = request.getParameter("adtn_prd_sno");
            String impUid = request.getParameter("imp_uid");
            String merchantUid = request.getParameter("merchant_uid");
            String payMethod = request.getParameter("pay_method");
            String payStatus = request.getParameter("pay_status");
            String pgTid = request.getParameter("pg_tid");
            String paidAtStr = request.getParameter("paid_at");
            String amountStr = request.getParameter("amount");
            String startDateStr = request.getParameter("startDate");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // 날짜 포맷은 실제 형식에 맞춰야 함

            java.util.Date utilDate = sdf.parse(startDateStr); // 먼저 util.Date로 파싱
            java.sql.Date startDate = new java.sql.Date(utilDate.getTime()); // 그리고 sql.Date로 변환

            System.out.println("프리패스 결제 저장 요청 - userId: " + userId + ", adtnPrdSno: " + adtnPrdSno
                + ", impUid: " + impUid + ", merchantUid: " + merchantUid + ", payMethod: " + payMethod
                + ", payStatus: " + payStatus + ", amount: " + amountStr);

            // 2. 유효성(필수값) 체크
            if (userId == null || adtnPrdSno == null || impUid == null || merchantUid == null ||
                payMethod == null || amountStr == null) {
                response.setContentType("application/json; charset=UTF-8");
                response.getWriter().write("{\"result\":0, \"msg\":\"필수 파라미터 누락\"}");
                return null;
            }

            int amount = Integer.parseInt(amountStr);

            Date paidAt = null;
            if (paidAtStr != null && !paidAtStr.isEmpty()) {
                long ts = Long.parseLong(paidAtStr) * 1000L;
                paidAt = new Date(ts);
            }


            // 3. DTO 생성
            FreePassPaymentDTO dto = new FreePassPaymentDTO();
            dto.setUserId(userId);
            dto.setAdtnPrdSno(adtnPrdSno);
            dto.setImpUid(impUid);
            dto.setMerchantUid(merchantUid);
            dto.setPayMethod(payMethod);
            dto.setAmount(amount);
            dto.setPayStatus(payStatus);
            dto.setPgTid(pgTid);
            dto.setPaidAt(paidAt);
            dto.setStartdate(startDate);

            // 4. DB 저장
            FreePassPaymentDAO dao = new FreePassPaymentDAO();
            int result = dao.insert(dto);

            // 5. 응답
            response.setContentType("application/json; charset=UTF-8");
            response.getWriter().write("{\"result\":" + result + "}");
            System.out.println("프리패스 결제 저장 결과: " + result);

        } catch (Exception e) {
            e.printStackTrace();
            response.setContentType("application/json; charset=UTF-8");
            response.getWriter().write("{\"result\":0, \"msg\":\"서버에러\"}");
        }
        return null;
    }
}
