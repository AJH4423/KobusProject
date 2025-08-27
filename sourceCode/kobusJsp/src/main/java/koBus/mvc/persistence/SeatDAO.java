package koBus.mvc.persistence;

import java.sql.SQLException;
import java.util.List;

import koBus.mvc.domain.ScheduleDTO;
import koBus.mvc.domain.SeatDTO;

public interface SeatDAO {

	// 버스의 총 좌석 수를 반환하는 메서드
	int getTotalSeats(String busId) throws SQLException;
	
	List<SeatDTO> searchSeat(String busId) throws SQLException;

	String getBusId(String deprId, String arrId, String formattedTime) throws SQLException;

	String searchSeatId(List<String> seatIdList) throws SQLException;
	
}
