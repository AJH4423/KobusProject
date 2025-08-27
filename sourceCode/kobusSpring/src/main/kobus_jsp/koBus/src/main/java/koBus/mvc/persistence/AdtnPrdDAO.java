package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.util.DBConn;

import koBus.mvc.domain.AdtnPrdDTO;
import koBus.mvc.domain.TimDteDTO;

public class AdtnPrdDAO {

    public List<AdtnPrdDTO> getAvailablePrdList(String userId) {
        List<AdtnPrdDTO> list = new ArrayList<>();
        String sql = "SELECT * FROM ADTN_PRD WHERE USER_ID = ? AND USE_YN = 'Y'";

        try (
            Connection conn = DBConn.getConnection();
            PreparedStatement pstmt = conn.prepareStatement(sql);
        ) {
            pstmt.setString(1, userId);
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                AdtnPrdDTO dto = new AdtnPrdDTO();
                dto.setAdtnCpnNo(rs.getString("ADTN_CPN_NO"));
                dto.setAdtnPrdKndCd(rs.getString("ADTN_PRD_KND_CD"));
                dto.setAdtnPrdUsePsbDno(rs.getString("ADTN_PRD_USE_PSB_DNO"));
                dto.setWkdWkeNtknNm(rs.getString("WKD_WKE_NTKN_NM"));
                dto.setAdtnPrdUseClsNm(rs.getString("ADTN_PRD_USE_CLS_NM"));
                dto.setExdtSttDt(rs.getString("EXDT_STT_DT"));
                dto.setExdtEndDt(rs.getString("EXDT_END_DT"));
                dto.setAdtnPrdUseNtknNm(rs.getString("ADTN_PRD_USE_NTKN_NM"));
                dto.setPubUserNo(rs.getString("PUB_USER_NO"));

                list.add(dto);
            }

            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    public List<TimDteDTO> getTimetableList() {
        List<TimDteDTO> list = new ArrayList<>();
        String sql = "SELECT * FROM ADTN_TIMDTE";

        try (
            Connection conn = DBConn.getConnection();
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
        ) {
            while (rs.next()) {
                TimDteDTO dto = new TimDteDTO();
                dto.setFpCpnNo(rs.getString("FP_CPN_NO"));
                dto.setTimDte(rs.getString("TIM_DTE"));
                list.add(dto);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}