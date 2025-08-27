package org.kobus.spring.service.reservation;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.kobus.spring.domain.reservation.ResvDTO;
import org.kobus.spring.mapper.reservation.ResvMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResvServiceImpl implements ResvService {
	
	@Autowired
	ResvMapper resvMapper;

	@Override
	public List<ResvDTO> searchResvList(String loginId) throws SQLException {
		List<ResvDTO> resvList = resvMapper.searchResvList(loginId);
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		
		// 포맷된 날짜 문자열 추가 세팅
        for (ResvDTO dto : resvList) {
            if (dto.getRideDate() != null) {
                dto.setRideDateStr(dto.getRideDate().format(formatter));
            }
            if (dto.getResvDate() != null) {
                dto.setResvDateStr(dto.getResvDate().format(formatter));
            }
        }
		
        return resvList;
	}

	@Override
	public int cancelResvList(String mrsMrnpNo) throws SQLException {
		// TODO Auto-generated method stub
		return resvMapper.cancelResvList(mrsMrnpNo);
	}

	@Override
    public List<ResvDTO> searchCancelResvList(String loginId) throws SQLException {
        List<ResvDTO> cancelList = resvMapper.searchCancelResvList(loginId);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // 포맷된 날짜 문자열 추가 세팅
        for (ResvDTO dto : cancelList) {
            if (dto.getRideDate() != null) {
                dto.setRideDateStr(dto.getRideDate().format(formatter));
            }
            if (dto.getResvDate() != null) {
                dto.setResvDateStr(dto.getResvDate().format(formatter));
            }
        }

        return cancelList;
    }


	@Override
	public int changeRemainSeats(String mrsMrnpNo, String rideDateTime) throws SQLException {
		return resvMapper.changeRemainSeats(mrsMrnpNo, rideDateTime);
	}

	@Override
	public int deleteResv(String changeResId) throws SQLException {
		return resvMapper.deleteResv(changeResId);
	}

}
