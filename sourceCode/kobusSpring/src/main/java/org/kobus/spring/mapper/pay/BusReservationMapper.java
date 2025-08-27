package org.kobus.spring.mapper.pay;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.kobus.spring.domain.pay.ResSeasonUsageDTO;
import org.kobus.spring.domain.pay.ReservationPaymentDTO;
import org.kobus.spring.domain.reservation.ResvDTO;

public interface BusReservationMapper {
	
	String findId(@Param("username") String username);
	int insertReservation(ResvDTO resvDto);
	int insertReservationPayment(ReservationPaymentDTO dto);
//	int changeReservation(@Param("resId") String resId);
	String generateResId();
	int callAfterReservation(@Param("resId") String resId, @Param("bshId") String bshId, 
			@Param("kusId") String kusId, @Param("seatList") String seatList, 
			@Param("selAdltCnt") int selAdltCnt, @Param("selTeenCnt") int selTeenCnt, @Param("selChldCnt") int selChldCnt);
	int updateRemainSeats(@Param("resId") String resId, @Param("rideDateStr") String rideDateStr);
	int insertSeasonUsage(ResSeasonUsageDTO usageDTO);
	String selectSeasonPayIdByAdtnSno(@Param("adtnPrdSno") String adtnPrdSno, @Param("kusid") String kusid);

}
