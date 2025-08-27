package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import com.util.ConnectionProvider;
import koBus.mvc.domain.FreePassOptionDTO;

public class FreePassOptionDAO {

    public List<FreePassOptionDTO> selectAllOptions() throws Exception {
        String sql = "SELECT * FROM free_pass_option ORDER BY adtn_prd_sno";

        List<FreePassOptionDTO> list = new ArrayList<>();

        try (Connection conn = ConnectionProvider.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                FreePassOptionDTO dto = new FreePassOptionDTO();
                dto.setAdtnPrdSno(rs.getString("adtn_prd_sno"));
                dto.setAdtnPrdUseClsCd(rs.getString("adtn_prd_use_cls_cd"));
                dto.setAdtnPrdUseClsNm(rs.getString("adtn_prd_use_cls_nm"));
                dto.setAdtnPrdUsePsbDno(rs.getInt("adtn_prd_use_psb_dno"));
                dto.setAdtnPrdUseNtknCd(rs.getString("adtn_prd_use_ntkn_cd"));
                dto.setAdtnPrdUseNtknNm(rs.getString("adtn_prd_use_ntkn_nm"));
                dto.setWkdWkeNtknCd(rs.getString("wkd_wke_ntkn_cd"));
                dto.setWkdWkeNtknNm(rs.getString("wkd_wke_ntkn_nm"));
                dto.setTempAlcnTissuPsbYn(rs.getString("temp_alcn_tissu_psb_yn"));
                dto.setAdtnDcYn(rs.getString("adtn_dc_yn"));

                list.add(dto);
            }
        }

        return list;
    }
    
    // 특정 프리패스 옵션(PK)으로 금액만 조회하는 메서드
    public int getAmountBySno(String adtnPrdSno) throws Exception {
        int amount = 0;
        String sql = "SELECT amount FROM free_pass_option WHERE adtn_prd_sno = ?";
        System.out.println("[DAO] getAmountBySno() adtnPrdSno = " + adtnPrdSno);
        try (Connection conn = ConnectionProvider.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, adtnPrdSno);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    amount = rs.getInt("amount");
                    System.out.println("[DAO] 조회된 amount = " + amount);
                } else {
                    System.out.println("[DAO] 해당 PK의 row가 없습니다!");
                }
            }
        }
        return amount;
    }
}