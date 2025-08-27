package org.kobus.spring.service.pay;

import org.kobus.spring.mapper.pay.PassProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentCheckServiceImpl implements PaymentCheckService{
	
	@Autowired
    private PassProductMapper passProductMapper;

	@Override
	public int getServerPrice(String prdSno) {
		return passProductMapper.getPriceByProductSno(prdSno);
    }
	
}
