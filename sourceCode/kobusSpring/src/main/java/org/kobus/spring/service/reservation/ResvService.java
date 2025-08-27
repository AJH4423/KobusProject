package org.kobus.spring.service.reservation;

import java.sql.SQLException;
import java.util.List;

import org.kobus.spring.domain.reservation.ResvDTO;
import org.springframework.stereotype.Service;

@Service
public interface ResvService {

	List<ResvDTO> searchResvList(String loginId) throws SQLException;

	int cancelResvList(String mrsMrnpNo) throws SQLException;

	List<ResvDTO> searchCancelResvList(String loginId) throws SQLException;
	
	int deleteResv(String changeResId) throws SQLException;

	int changeRemainSeats(String mrsMrnpNo, String rideDateTime) throws SQLException;

}
