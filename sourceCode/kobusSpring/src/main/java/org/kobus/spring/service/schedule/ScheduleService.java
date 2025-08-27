package org.kobus.spring.service.schedule;

import java.sql.SQLException;
import java.util.List;

import org.kobus.spring.domain.schedule.ScheduleDTO;
import org.springframework.stereotype.Service;

@Service
public interface ScheduleService {
	
	List<ScheduleDTO> selectBySidoCode(int sidoCode);

	List<ScheduleDTO> selectByRegion();
	
	List<ScheduleDTO> searchBusSchedule(String deprId, String arrId, String deprDtm, String busClsCd) throws SQLException;
	
	//public int getDurationFromRoute(String deprCd, String arvlCd) throws SQLException;
	
	Integer getRouteDuration(String deprRegId, String arvlRegId);

}
