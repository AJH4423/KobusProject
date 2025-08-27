package koBus.mvc.persistence;

import java.sql.SQLException;
import java.util.List;

import koBus.mvc.domain.ScheduleDTO;


public interface ScheduleDAO {
	List<ScheduleDTO> selectBySidoCode(int sidoCode);

	List<ScheduleDTO> selectByRegion();
	
	List<ScheduleDTO> searchBusSchedule(String deprId, String arrId, String deprDtm, String busClsCd) throws SQLException;
	
	public int getDurationFromRoute(String deprCd, String arvlCd) throws SQLException;
}
