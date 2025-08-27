package org.kobus.spring.mapper.reservation;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.kobus.spring.domain.reservation.SeatDTO;

public interface SeatMapper {
	
	int getTotalSeats(@Param("busId") String busId) throws SQLException;
	
	List<SeatDTO> searchSeat(@Param("busId") String busId) throws SQLException;

	String getBusId(@Param("deprId") String deprId, @Param("arrId") String arrId, @Param("formattedTime") String formattedTime) throws SQLException;

	String searchSeatId(@Param("list") List<String> seatIdList) throws SQLException;

}
