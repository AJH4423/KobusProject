package org.kobus.spring.mapper.pay;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.kobus.spring.domain.pay.SeasonTicketOptionDTO;
import org.kobus.spring.domain.pay.SeasonTicketRouteDTO;

@Mapper
public interface PassRotLinInfMapper {
	
	List<SeasonTicketRouteDTO> getAllRoutes();

    List<SeasonTicketOptionDTO> getOptionsByRouteId(@Param("routeId") String routeId);

}
