package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


import koBus.mvc.domain.RegionDTO;
import com.util.ConnectionProvider;

public class RegionDAOImpl implements RegionDAO {

    public RegionDAOImpl() {
        // 더 이상 커넥션을 외부에서 주입받지 않음
    }

    @Override
    public List<RegionDTO> selectBySidoCode(int sidoCode) {
        List<RegionDTO> list = new ArrayList<>();
        String sql = "SELECT regID, regName, sidoCode FROM region WHERE sidoCode = ?";

        try (
            Connection conn = ConnectionProvider.getConnection();
            PreparedStatement pstmt = conn.prepareStatement(sql)
        ) {
            pstmt.setInt(1, sidoCode);

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    RegionDTO dto = RegionDTO.builder()
                            .regID(rs.getString("regID"))
                            .regName(rs.getString("regName"))
                            .sidoCode(rs.getInt("sidoCode"))
                            .build();
                    list.add(dto);
                }
            }

            System.out.println(">>> [DAO] 조회된 행 수: " + list.size());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    @Override
    public List<RegionDTO> selectAll() {
        List<RegionDTO> list = new ArrayList<>();
        String sql = "SELECT * FROM region ORDER BY regName ASC";

        try (
            Connection conn = ConnectionProvider.getConnection();
            PreparedStatement pstmt = conn.prepareStatement(sql);
            ResultSet rs = pstmt.executeQuery()
        ) {
            while (rs.next()) {
                RegionDTO dto = RegionDTO.builder()
                        .regID(rs.getString("regID"))
                        .regName(rs.getString("regName"))
                        .sidoCode(rs.getInt("sidoCode"))
                        .build();
                list.add(dto);
            }

            System.out.println(">>> [DAO] 전체 지역 조회된 행 수: " + list.size());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
}
