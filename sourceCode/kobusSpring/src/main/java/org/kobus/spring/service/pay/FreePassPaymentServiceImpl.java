package org.kobus.spring.service.pay;

import org.kobus.spring.domain.pay.FreepassPaymentDTO;
import org.kobus.spring.domain.pay.PaymentCommonDTO;
import org.kobus.spring.domain.pay.STPaymentSet;
import org.kobus.spring.mapper.pay.FreePassPaymentMapper;
import org.kobus.spring.mapper.pay.PaymentCommonMapper;
import org.kobus.spring.mapper.pay.SeasonPaymentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FreePassPaymentServiceImpl implements FreePassPaymentService{

    @Autowired
    private PaymentCommonMapper paymentMapper;

    @Autowired
    private FreePassPaymentMapper freepassMapper;
    
    @Autowired
    private SeasonPaymentMapper seasonPaymentMapper;
    
    @Override
    @Transactional
    public int processFreepassPayment(PaymentCommonDTO payDto, FreepassPaymentDTO freepassDto) {
    	System.out.println("✅ 프리패스 결제 Service 진입");
        // 1. 공통 결제정보 저장 (PK 생성)
        int inserted1 = paymentMapper.insertPaymentCommon(payDto);

        // 2. FK인 payment_id를 프리패스 DTO에 넣기
        freepassDto.setPaymentId(payDto.getPaymentId());

        // 3. 프리패스 결제정보 저장
        int inserted2 = freepassMapper.insertFreepassPayment(freepassDto);

        return (inserted1 > 0 && inserted2 > 0) ? 1 : 0;
    }

    @Override
	@Transactional
	public boolean saveSeasonTicketPayment(STPaymentSet dto) {
		// 1. 공통 결제 정보 저장 (payment_common)
	    int res0 = seasonPaymentMapper.insertPaymentCommon(dto); // 여기에 paymentId 세팅됨

	    // 2. 정기권 결제 정보 저장 (season_ticket_payment)
	    int res1 = seasonPaymentMapper.insertSeasonTicketPayment(dto);

	    // 모두 성공해야 true 반환
	    return (res0 > 0 && res1 > 0);
    }
}
