package org.kobus.spring.mapper.pay;

import org.apache.ibatis.annotations.Param;

public interface PassProductMapper {
	
    int getPriceByProductSno(@Param("prdSno") String prdSno);
}

