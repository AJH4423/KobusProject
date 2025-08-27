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

        String updateSeatSql = "UPDATE BUSSCHEDULE B "
                             + "SET REMAINSEATS = ( "
                             + "    SELECT COUNT(*) "
                             + "    FROM SEAT S "
                             + "    WHERE S.BUSID = B.BUSID "
                             + "      AND S.SEATABLE = 'Y' "
                             + ") "
                             + "WHERE B.BSHID = ( "
                             + "    SELECT R.BSHID "
                             + "    FROM RESERVATION R "
                             + "    WHERE R.RESID = ? "
                             + ")";

        try (
            Connection conn = DBConn.getConnection();
            PreparedStatement pstmt = conn.prepareStatement(sql)
        ) {
            conn.setAutoCommit(false); // 트랜잭션 시작

            pstmt.setString(1, dto.getResID());
            pstmt.setString(2, dto.getBshID());
            pstmt.setString(3, dto.getSeatID());
            pstmt.setString(4, dto.getKusID());
            pstmt.setTimestamp(5, dto.getRideDate());
            pstmt.setDate(6, dto.getResvDate());
            pstmt.setString(7, dto.getResvStatus());
            pstmt.setString(8, dto.getResvType());
            pstmt.setInt(9, dto.getQrCode());
            pstmt.setInt(10, dto.getMileage());
            pstmt.setString(11, dto.getSeatAble());

            int cnt = pstmt.executeUpdate();

            int seatUpdateResult = 0;
            try (PreparedStatement pstmt2 = conn.prepareStatement(updateSeatSql)) {
                pstmt2.setString(1, dto.getResID());
                seatUpdateResult = pstmt2.executeUpdate();
                System.out.println("남은 좌석 수 갱신 완료: " + seatUpdateResult + "건");
            }

            if (cnt == 1 && seatUpdateResult == 1) {
                conn.commit(); // 커밋
                return true;
            } else {
                conn.rollback(); // 실패 시 롤백
                return false;
            }

        } catch (SQLException e) {
            System.out.println("[ReservationDAO] insertReservation 오류: " + e.getMessage());
            try {
                DBConn.getConnection().rollback(); // 예외 발생 시 롤백
            } catch (SQLException ex) {
                System.out.println("[ReservationDAO] rollback 실패: " + ex.getMessage());
            }
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
            conn.setAutoCommit(true);

            pstmt.setString(1, resID);

            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    ReservationDTO dto = new ReservationDTO();
                    dto.setResID(rs.getString("resid"));
                    dto.setBshID(rs.getString("bshid"));
                    dto.setSeatID(rs.getString("seatid"));
                    dto.setKusID(rs.getString("kusid"));
                    dto.setRideDate(rs.getTimestamp("ridedate"));
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
            conn.setAutoCommit(true);

            if (rs.next()) {
                return rs.getString(1);
            }

        } catch (SQLException e) {
            System.out.println("[ReservationDAO] generateResId 오류: " + e.getMessage());
        }
        return null;
    }

    // 4. 예매 변경 (삭제)
    public int changeReservation(String changeResId) {
        String sql = "DELETE FROM reservation WHERE resid = ?";

        try (
            Connection conn = DBConn.getConnection();
            PreparedStatement pstmt = conn.prepareStatement(sql)
        ) {
            conn.setAutoCommit(true);

            pstmt.setString(1, changeResId);
            int result = pstmt.executeUpdate();
            return result;
        } catch (SQLException e) {
            System.out.println("[ReservationDAO] changeReservation 오류: " + e.getMessage());
        }

        return 0; // 실패 시 0 반환
    }

}
