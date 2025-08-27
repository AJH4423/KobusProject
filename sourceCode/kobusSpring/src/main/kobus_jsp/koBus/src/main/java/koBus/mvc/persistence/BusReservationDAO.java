package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.util.DBConn;

import koBus.mvc.domain.BusReservationDTO;

public class BusReservationDAO {

	public int insertReservation(BusReservationDTO dto) {
	    Connection conn = null;
	    PreparedStatement pstmt = null;
	    int result = 0;

	    String sql = "INSERT INTO reservation " +
	                 "(resID, bshID, seatID, kusID, rideDate, resvDate, resvStatus, resvType, qrCode, mileage, seatAble) " +
	                 "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

	    try {
	        conn = DBConn.getConnection();
	        pstmt = conn.prepareStatement(sql);

	        pstmt.setString(1, dto.getResId());                    // resID
	        pstmt.setString(2, dto.getBusScheduleId());            // bshID
	        pstmt.setString(3, dto.getSeatNumber());               // seatID
	        pstmt.setString(4, dto.getUserId());                   // kusID
	        pstmt.setDate(5, dto.getBoardingDt());                 // rideDate
	        pstmt.setDate(6, new Date(System.currentTimeMillis())); // resvDate
	        pstmt.setString(7, "결제완료");                         // resvStatus
	        pstmt.setString(8, "일반");                             // resvType
	        pstmt.setInt(9, (int)(Math.random() * 900000) + 100000); // qrCode
	        pstmt.setInt(10, 0);                                   // mileage
	        pstmt.setString(11, "Y");                              // seatAble

	        result = pstmt.executeUpdate();

	    } catch (SQLException e) {
	        System.out.println("[insertReservation] 오류: " + e.getMessage());
	    } finally {
	        DBConn.close();
	    }

	    return result;
	}
}