package org.kobus.spring.mapper.pay;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.kobus.spring.domain.pay.FrpsTermDTO;

@Mapper
public interface TermMapper {
	
	List<FrpsTermDTO> frpsOptionList();
	
	FrpsTermDTO selectTermInfo(FrpsTermDTO dto);
	
	int getAmountBySno(@Param("adtnPrdSno") String adtnPrdSno);

}
