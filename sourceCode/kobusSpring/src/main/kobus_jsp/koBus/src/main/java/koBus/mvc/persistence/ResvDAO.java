package koBus.mvc.persistence;

import java.sql.SQLException;
import java.util.List;

import koBus.mvc.domain.ResvDTO;

public interface ResvDAO {

	List<ResvDTO> searchResvList(String loginId) throws SQLException;

	int cancelResvList(String mrsMrnpNo) throws SQLException;

	List<ResvDTO> searchCancelResvList(String loginId) throws SQLException;

	int changeRemainSeats(String mrsMrnpNo, String rideTime) throws SQLException;

}
