package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.util.DBConn;

import koBus.mvc.domain.RouteLineDTO;

public class RouteLineDAO {
    public List<RouteLineDTO> getAllRoutes() throws Exception {
        List<RouteLineDTO> list = new ArrayList<>();
        String sql = "SELECT * FROM PASS_ROUTE ORDER BY ADTN_DEPR_NM";

        try (Connection conn = DBConn.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                RouteLineDTO dto = new RouteLineDTO();
                dto.setRouteId(rs.getString("ROUTE_ID"));
                dto.setStartName(rs.getString("ADTN_DEPR_NM"));
                dto.setEndName(rs.getString("ADTN_ARVL_NM"));
                dto.setSellStartDate(rs.getString("ADTN_PRD_SELL_STT_DT"));
                list.add(dto);
            }
        }
        return list;
    }
}

