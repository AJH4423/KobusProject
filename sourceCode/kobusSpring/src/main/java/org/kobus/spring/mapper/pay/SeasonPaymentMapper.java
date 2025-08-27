package org.kobus.spring.mapper.pay;

import org.apache.ibatis.annotations.Mapper;
import org.kobus.spring.domain.pay.STPaymentSet;

@Mapper
public interface SeasonPaymentMapper {
    
	/* 정기권 결제 정보 저장 */
	int insertPaymentCommon(STPaymentSet dto);
    int insertSeasonTicketPayment(STPaymentSet dto);

}
