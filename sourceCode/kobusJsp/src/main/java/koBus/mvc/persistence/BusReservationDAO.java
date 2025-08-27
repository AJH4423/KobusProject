package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.util.DBConn;

import koBus.mvc.domain.BusReservationDTO;

public class BusReservationDAO {

    public int insertReservation(BusReservationDTO dto) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        int result = 0;

        String sql = "INSERT INTO reservation "
                   + "(res_id, user_id, bus_schedule_id, seat_number, boarding_dt, amount) "
                   + "VALUES (?, ?, ?, ?, ?, ?)";

        try {
            conn = DBConn.getConnection();
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, dto.getResId());          // ✅ res_id 추가
            pstmt.setString(2, dto.getUserId());
            pstmt.setString(3, dto.getBusScheduleId());
            pstmt.setString(4, dto.getSeatNumber());
            pstmt.setDate(5, dto.getBoardingDt());
            pstmt.setInt(6, dto.getTotalPrice());

            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("[insertReservation] 오류: " + e.getMessage());
        } finally {
            DBConn.close();
        }

        return result;
    }

}
