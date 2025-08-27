package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.util.DBConn;

import koBus.mvc.domain.BusPaymentDTO;

public class BusPaymentDAO {

    public int insertPayment(BusPaymentDTO dto) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        int result = 0;

        String sql = "INSERT INTO reservation_payment "
                   + "(reservation_payment_id, res_id, kusid, imp_uid, merchant_uid, pay_method, amount, pay_status, pg_tid, paid_at) "
                   + "VALUES (reservation_payment_seq.NEXTVAL, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try {
            conn = DBConn.getConnection();
            pstmt = conn.prepareStatement(sql);

            // 🔸 바인딩 순서 주의!
            pstmt.setString(1, dto.getResId());         // RES_ID
            pstmt.setString(2, dto.getUserId());        // KUSID
            pstmt.setString(3, dto.getImpUid());
            pstmt.setString(4, dto.getMerchantUid());
            pstmt.setString(5, dto.getPayMethod());
            pstmt.setInt(6, dto.getAmount());
            pstmt.setString(7, dto.getPayStatus());
            pstmt.setString(8, dto.getPgTid());
            pstmt.setDate(9, dto.getPaidAt());

            result = pstmt.executeUpdate();

        } catch (SQLException e) {
            System.out.println("[insertPayment] SQL 오류: " + e.getMessage());
        } finally {
            DBConn.close();
        }

        return result;
    }
}
