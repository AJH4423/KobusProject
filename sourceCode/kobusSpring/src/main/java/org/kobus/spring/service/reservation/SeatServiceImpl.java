package org.kobus.spring.service.reservation;

import java.sql.SQLException;
import java.util.List;

import org.kobus.spring.domain.reservation.SeatDTO;
import org.kobus.spring.mapper.reservation.SeatMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeatServiceImpl implements SeatService {
	
	@Autowired
	SeatMapper seatMapper;

	@Override
	public int getTotalSeats(String busId) throws SQLException {
		return seatMapper.getTotalSeats(busId);
	}

	@Override
	public List<SeatDTO> searchSeat(String busId) throws SQLException {
		return seatMapper.searchSeat(busId);
	}

	@Override
	public String getBusId(String deprId, String arrId, String formattedTime) throws SQLException {
		return seatMapper.getBusId(deprId, arrId, formattedTime);
	}

	@Override
	public String searchSeatId(List<String> seatIdList) throws SQLException {
		if (seatIdList == null || seatIdList.isEmpty()) {
	        return "";  // 빈 문자열 반환 (null 아님)
	    }
		
		String seatNos = seatMapper.searchSeatId(seatIdList);

        if (seatNos == null) {
            seatNos = "";
        }

        return seatNos;
		
	}

}
