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
        String paySql = "INSERT INTO PAYMENT (PAYMENT_ID, USER_ID, IMP_UID, MERCHANT_UID, PAY_METHOD, " +
                        "AMOUNT, PAY_STATUS, PG_TID, PAID_AT) VALUES (PAYMENT_SEQ.NEXTVAL, ?, ?, ?, ?, ?, ?, ?, ?)";
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
            payPstmt = conn.prepareStatement(paySql, new String[] { "PAYMENT_ID" });
            payPstmt.setString(1, payDto.getUserId());
            payPstmt.setString(2, payDto.getImpUid());
            payPstmt.setString(3, payDto.getMerchantUid());
            payPstmt.setString(4, payDto.getPayMethod());
            payPstmt.setInt(5, payDto.getAmount());
            payPstmt.setString(6, payDto.getPayStatus());
            payPstmt.setString(7, payDto.getPgTid());
            payPstmt.setDate(8, payDto.getPaidAt());
            payPstmt.executeUpdate();

            // 3. 생성된 결제 PK(PAYMENT_ID) 가져오기
            rs = payPstmt.getGeneratedKeys();
            int paymentId = 0;
            if (rs.next()) {
                paymentId = rs.getInt(1);
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
            resvPstmt.setDate(5, resvDto.getRideDate());
            resvPstmt.setDate(6, resvDto.getResvDate());
            resvPstmt.setString(7, resvDto.getResvStatus());
            resvPstmt.setString(8, resvDto.getResvType());
            resvPstmt.setInt(9, resvDto.getQrCode());
            resvPstmt.setInt(10, resvDto.getMileage());
            resvPstmt.setString(11, resvDto.getSeatAble());
            int cnt = resvPstmt.executeUpdate();

            // 5. 모두 성공시 commit
            if (cnt == 1) {
                conn.commit();
                result = true;
            } else {
                conn.rollback();
            }
        } catch (SQLException e) {
            try { if (conn != null) conn.rollback(); } catch (Exception ex) {}
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
