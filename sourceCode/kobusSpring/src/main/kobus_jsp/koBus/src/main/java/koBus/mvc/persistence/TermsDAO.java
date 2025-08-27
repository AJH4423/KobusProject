package koBus.mvc.persistence;

import java.sql.*;
import com.util.DBConn;

import koBus.mvc.domain.TermsDTO;

public class TermsDAO {
    private Connection conn = DBConn.getConnection();

    public TermsDTO selectById(int termsId) throws SQLException {
        TermsDTO dto = null;

        String sql = "SELECT terms_id, terms_type, title, content FROM TERMS WHERE terms_id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, termsId);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    dto = new TermsDTO();
                    dto.setTerms_id(rs.getInt("terms_id"));
                    dto.setTerms_type(rs.getString("terms_type"));
                    dto.setTitle(rs.getString("title"));
                    Clob clob = rs.getClob("content");
                    dto.setContent(clob.getSubString(1, (int) clob.length()));
                }
            }
        }

        return dto;
    }
}
