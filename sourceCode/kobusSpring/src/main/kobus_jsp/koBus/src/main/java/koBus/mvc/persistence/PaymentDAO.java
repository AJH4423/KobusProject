package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import koBus.mvc.domain.PaymentDTO;
import koBus.mvc.domain.ReservationDTO;
import com.util.DBConn;

public class PaymentDAO {
    // 트랜잭션: 결제와 예매를 한 번에 저장
    public boolean insertPaymentAndReservation(PaymentDTO payDto, ReservationDTO resvDto) {
        String paySql = "INSERT INTO PAYMENT (PAYMENT_ID, KUSID, IMP_UID, MERCHANT_UID, PAY_METHOD, " +
                        "AMOUNT, PAY_STATUS, PG_TID, PAID_AT, ADTN_PRD_SNO, ROUTE_ID, STARTDATE) " +
                        "VALUES (PAYMENT_SEQ.NEXTVAL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        String resvSql = "INSERT INTO reservation (resID, bshID, seatID, kusID, rideDate, resvDate, resvStatus, resvType, qrCode, mileage, seatAble) " +
                         "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        Connection conn = null;
        PreparedStatement payPstmt = null;
        PreparedStatement resvPstmt = null;
        ResultSet rs = null;
        boolean result = false;

        try {
            conn = DBConn.getConnection();
            conn.setAutoCommit(false); // 1. 오토커밋 해제

            // 2. 결제 INSERT
            payPstmt = conn.prepareStatement(paySql, new String[]{"PAYMENT_ID"});
            payPstmt.setString(1, payDto.getUserId());
            payPstmt.setString(2, payDto.getImpUid());
            payPstmt.setString(3, payDto.getMerchantUid());
            payPstmt.setString(4, payDto.getPayMethod());
            payPstmt.setInt(5, payDto.getAmount());
            payPstmt.setString(6, payDto.getPayStatus());
            payPstmt.setString(7, payDto.getPgTid());
            payPstmt.setDate(8, payDto.getPaidAt());

            // ✅ 새로 추가된 세 항목
            payPstmt.setString(9, payDto.getAdtnPrdSno()); // ADTN_PRD_SNO
            payPstmt.setString(10, payDto.getRouteId());   // ROUTE_ID
            payPstmt.setDate(11, payDto.getStartDate());   // STARTDATE

            System.out.println("[PaymentDAO] 결제 INSERT 실행 전 파라미터:");
            System.out.println(" - KUSID: " + payDto.getUserId());
            System.out.println(" - ADTN_PRD_SNO: " + payDto.getAdtnPrdSno());
            System.out.println(" - ROUTE_ID: " + payDto.getRouteId());
            System.out.println(" - STARTDATE: " + payDto.getStartDate());

            payPstmt.executeUpdate();

            // 3. 생성된 결제 PK(PAYMENT_ID) 가져오기
            rs = payPstmt.getGeneratedKeys();
            int paymentId = 0;
            if (rs.next()) {
                paymentId = rs.getInt(1);
                System.out.println("[PaymentDAO] 생성된 paymentId: " + paymentId);
            } else {
                conn.rollback();
                return false;
            }

            // 4. 예매 INSERT
            resvPstmt = conn.prepareStatement(resvSql);
            resvPstmt.setString(1, resvDto.getResID());
            resvPstmt.setString(2, resvDto.getBshID());
            resvPstmt.setString(3, resvDto.getSeatID());
            resvPstmt.setString(4, resvDto.getKusID());
            resvPstmt.setTimestamp(5, resvDto.getRideDate());
            resvPstmt.setDate(6, resvDto.getResvDate());
            resvPstmt.setString(7, resvDto.getResvStatus());
            resvPstmt.setString(8, resvDto.getResvType());
            resvPstmt.setInt(9, resvDto.getQrCode());
            resvPstmt.setInt(10, resvDto.getMileage());
            resvPstmt.setString(11, resvDto.getSeatAble());

            System.out.println("[PaymentDAO] 예매 INSERT 실행 전 파라미터:");
            System.out.println(" - RESID: " + resvDto.getResID());
            System.out.println(" - BSHID: " + resvDto.getBshID());
            System.out.println(" - SEATID: " + resvDto.getSeatID());

            int cnt = resvPstmt.executeUpdate();

            // 5. 모두 성공시 commit
            if (cnt == 1) {
                conn.commit();
                result = true;
                System.out.println("[PaymentDAO] 결제 + 예매 COMMIT 완료");
            } else {
                conn.rollback();
                System.out.println("[PaymentDAO] 예매 INSERT 실패, ROLLBACK 수행");
            }

        } catch (SQLException e) {
            try { if (conn != null) conn.rollback(); } catch (Exception ex) {}
            System.out.println("[PaymentDAO][ERROR] SQL 예외 발생: " + e.getMessage());
            e.printStackTrace();
        } finally {
            try { if (rs != null) rs.close(); } catch (Exception ex) {}
            try { if (payPstmt != null) payPstmt.close(); } catch (Exception ex) {}
            try { if (resvPstmt != null) resvPstmt.close(); } catch (Exception ex) {}
            try { if (conn != null) conn.setAutoCommit(true); } catch (Exception ex) {}
            try { if (conn != null) conn.close(); } catch (Exception ex) {}
        }

        return result;
    }
}