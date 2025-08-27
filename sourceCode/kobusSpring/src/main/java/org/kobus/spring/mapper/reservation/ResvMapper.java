package org.kobus.spring.mapper.reservation;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.kobus.spring.domain.reservation.ResvDTO;

public interface ResvMapper {
	
	List<ResvDTO> searchResvList(@Param("loginId") String loginId) throws SQLException;

	int cancelResvList(@Param("mrsMrnpNo") String mrsMrnpNo) throws SQLException;

	List<ResvDTO> searchCancelResvList(@Param("loginId") String loginId) throws SQLException;

	int changeRemainSeats(@Param("mrsMrnpNo") String mrsMrnpNo, @Param("rideTime") String rideTime) throws SQLException;

	int deleteResv(@Param("changeResId") String changeResId);

}
