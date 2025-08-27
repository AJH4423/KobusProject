package org.kobus.spring.mapper.pay;

import org.apache.ibatis.annotations.Mapper;
import org.kobus.spring.domain.pay.FreepassPaymentDTO;

@Mapper
public interface FreePassPaymentMapper {
	
	/**
     * 프리패스 결제 정보 저장
     * @param dto FreepassPaymentDTO
     * @return insert 성공 행 수 (1: 성공, 0: 실패)
     */
    int insertFreepassPayment(FreepassPaymentDTO dto);

}
