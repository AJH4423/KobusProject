package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import com.util.DBConn;
import koBus.mvc.domain.FreePassPaymentDTO;


public class FreePassPaymentDAO {
    public int insert(FreePassPaymentDTO dto) throws Exception {
        String sql = "INSERT INTO FREE_PASS_PAYMENT (FREE_PASS_PAYMENT_ID, KUSID, ADTN_PRD_SNO, IMP_UID, MERCHANT_UID, PAY_METHOD, AMOUNT, PAY_STATUS, PG_TID, PAID_AT, REG_DT, STARTDATE) " +
                     "VALUES (FREE_PASS_PAYMENT_SEQ.NEXTVAL, ?, ?, ?, ?, ?, ?, ?, ?, ?, SYSDATE, ?)";
        try (Connection con = DBConn.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, dto.getUserId());
            ps.setString(2, dto.getAdtnPrdSno());
            ps.setString(3, dto.getImpUid());
            ps.setString(4, dto.getMerchantUid());
            ps.setString(5, dto.getPayMethod());
            ps.setInt(6, dto.getAmount());
            ps.setString(7, dto.getPayStatus());
            ps.setString(8, dto.getPgTid());
            ps.setDate(9, dto.getPaidAt()); // paidAt은 java.sql.Date로 변환해서 넘겨야 함
            ps.setDate(10, dto.getStartdate());

            return ps.executeUpdate();
        }
    }
}