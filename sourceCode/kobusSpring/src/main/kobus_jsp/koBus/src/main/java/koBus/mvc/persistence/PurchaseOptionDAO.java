package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import com.util.DBConn;
import koBus.mvc.domain.PurchaseOptionDTO;

public class PurchaseOptionDAO {
    public List<PurchaseOptionDTO> getAllOptions() throws Exception {
        List<PurchaseOptionDTO> list = new ArrayList<>();
        String sql = "SELECT * FROM PASS_DETAIL ORDER BY ADTN_PRD_SNO";
        
        System.out.println("✅ DAO 진입 - 구매옵션 조회 시작");

        try (Connection conn = DBConn.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                PurchaseOptionDTO dto = new PurchaseOptionDTO();
                dto.setOptionId(rs.getString("ADTN_PRD_SNO"));
                dto.setUseClsCd(rs.getString("ADTN_PRD_USE_CLS_CD"));
                dto.setUseClsNm(rs.getString("ADTN_PRD_USE_CLS_NM"));
                dto.setUseDays(rs.getString("ADTN_PRD_USE_PSB_DNO"));
                dto.setPeriodCd(rs.getString("ADTN_PRD_USE_NTKN_CD"));
                dto.setPeriodNm(rs.getString("ADTN_PRD_USE_NTKN_NM"));
                dto.setBusGradeCd(rs.getString("WKD_WKE_NTKN_CD"));
                dto.setBusGradeNm(rs.getString("WKD_WKE_NTKN_NM"));
                list.add(dto);
            }
        }catch (SQLException e) {
            System.out.println("❌ DAO 오류: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
        return list;
    }
}

