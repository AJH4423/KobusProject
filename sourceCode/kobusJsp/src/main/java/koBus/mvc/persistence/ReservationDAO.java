package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Date;

import com.util.DBConn;

import koBus.mvc.domain.ReservationDTO;

public class ReservationDAO {

    // 1. 예매 INSERT
    public boolean insertReservation(ReservationDTO dto) {
        String sql = "INSERT INTO reservation "
                   + "(resID, bshID, seatID, kusID, rideDate, resvDate, resvStatus, resvType, qrCode, mileage, seatAble) "
                   + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (
            Connection conn = DBConn.getConnection();
            PreparedStatement pstmt = conn.prepareStatement(sql)
        ) {
            pstmt.setString(1, dto.getResID());
            pstmt.setString(2, dto.getBshID());
            pstmt.setString(3, dto.getSeatID());
            pstmt.setString(4, dto.getKusID());
            pstmt.setDate(5, dto.getRideDate());
            pstmt.setDate(6, dto.getResvDate());
            pstmt.setString(7, dto.getResvStatus());
            pstmt.setString(8, dto.getResvType());
            pstmt.setInt(9, dto.getQrCode());
            pstmt.setInt(10, dto.getMileage());
            pstmt.setString(11, dto.getSeatAble());


            int cnt = pstmt.executeUpdate();
            return cnt == 1;

        } catch (SQLException e) {
            System.out.println("[ReservationDAO] insertReservation 오류: " + e.getMessage());
            return false;
        }
    }

    // 2. 예매 상세 조회
    public ReservationDTO selectReservationDetail(String resID) {
        String sql = "SELECT * FROM reservation WHERE resID = ?";

        try (
            Connection conn = DBConn.getConnection();
            PreparedStatement pstmt = conn.prepareStatement(sql)
        ) {
            pstmt.setString(1, resID);

            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    ReservationDTO dto = new ReservationDTO();
                    dto.setResID(rs.getString("resid"));
                    dto.setBshID(rs.getString("bshid"));
                    dto.setSeatID(rs.getString("seatid"));
                    dto.setKusID(rs.getString("kusid"));
                    dto.setRideDate(rs.getDate("ridedate"));
                    dto.setResvDate(rs.getDate("resvdate"));
                    dto.setResvStatus(rs.getString("resvstatus"));
                    dto.setResvType(rs.getString("resvtype"));
                    dto.setQrCode(rs.getInt("qrcode"));
                    dto.setMileage(rs.getInt("mileage"));
                    dto.setSeatAble(rs.getString("seatable"));

                    return dto;
                }
            }

        } catch (Exception e) {
            System.out.println("[ReservationDAO] selectReservationDetail 오류: " + e.getMessage());
        }
        return null;
    }

    // 3. 예매 ID 생성 (시퀀스)
    public String generateResId() {
        String sql = "SELECT 'RES' || reservation_seq.NEXTVAL FROM dual";

        try (
            Connection conn = DBConn.getConnection();
            PreparedStatement pstmt = conn.prepareStatement(sql);
            ResultSet rs = pstmt.executeQuery()
        ) {
            if (rs.next()) {
                return rs.getString(1);
            }

        } catch (SQLException e) {
            System.out.println("[ReservationDAO] generateResId 오류: " + e.getMessage());
        }
        return null;
    }
}
