package org.kobus.spring.service.schedule;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.kobus.spring.domain.schedule.ScheduleDTO;
import org.kobus.spring.mapper.schedule.ScheduleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleMapper scheduleMapper;

    @Override
    public List<ScheduleDTO> selectBySidoCode(int sidoCode) {
        return scheduleMapper.selectBySidoCode(sidoCode);
    }

    @Override
    public List<ScheduleDTO> selectByRegion() {
        return scheduleMapper.selectByRegion();
    }

    @Override
    public List<ScheduleDTO> searchBusSchedule(String deprId, String arrId, String deprDtm, String busClsCd) {
        String convertedDeprDtm = null;

        if (deprDtm != null) {
            String trimmed = deprDtm.trim();

            if (trimmed.matches("\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}")) {
                String datePart = trimmed.substring(0, 10).replace("-", "");
                String timePart = trimmed.substring(11, 16);
                convertedDeprDtm = datePart + " " + timePart;

            } else if (trimmed.matches("\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}")) {
                convertedDeprDtm = trimmed.replaceAll("-", "").substring(0, 8) + " " + trimmed.substring(11, 16);

            } else if (trimmed.matches("\\d{4}-\\d{2}-\\d{2}")) {
                convertedDeprDtm = trimmed.replace("-", "");

            } else if (trimmed.matches("\\d{8} \\d{2}:\\d{2}")) {
                convertedDeprDtm = trimmed;

            } else if (trimmed.matches("\\d{8}")) {
                convertedDeprDtm = trimmed;

            } else if (trimmed.matches("\\d{8} \\d{2}:\\d{2}:\\d{2}")) {
                convertedDeprDtm = trimmed;

            } else {
                System.out.println("입력 형식이 올바르지 않습니다.");
            }
        }

        return scheduleMapper.searchBusSchedule(deprId, arrId, convertedDeprDtm, busClsCd);
    }

    
    /*
    @Override
    public int getDurationFromRoute(String deprRegId, String arvlRegId) {
        return scheduleMapper.getDurationFromRoute(deprRegId, arvlRegId);
    }
    */
    
    @Override
    public Integer getRouteDuration(String deprRegId, String arvlRegId) {
        return scheduleMapper.getRouteDuration(deprRegId, arvlRegId);
    }

	
}
