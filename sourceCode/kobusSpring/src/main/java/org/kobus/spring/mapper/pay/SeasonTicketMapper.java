package org.kobus.spring.mapper.pay;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.kobus.spring.domain.pay.ResSeasonUsageDTO;
import org.kobus.spring.domain.pay.SeasonTicketDTO;

public interface SeasonTicketMapper {
	
    List<SeasonTicketDTO> selectSeasonTicketListByKusid(String kusid);
    List<ResSeasonUsageDTO> selectUsedDatesByKusid(String kusid);
    int countUsagePerDay(@Param("adtnPrdSno") String adtnPrdSno, @Param("usedDate") String usedDate);
    
}
