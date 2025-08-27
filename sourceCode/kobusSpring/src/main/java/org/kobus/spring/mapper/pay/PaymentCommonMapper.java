package org.kobus.spring.mapper.pay;

import org.apache.ibatis.annotations.Mapper;
import org.kobus.spring.domain.pay.PaymentCommonDTO;

@Mapper
public interface PaymentCommonMapper {
	
	/**
     * 공통 결제 정보 삽입
     * @param dto PaymentCommonDTO (paymentId는 selectKey로 생성됨)
     * @return insert 성공 행 수 (1: 성공, 0: 실패)
     */
    int insertPaymentCommon(PaymentCommonDTO dto);

}
