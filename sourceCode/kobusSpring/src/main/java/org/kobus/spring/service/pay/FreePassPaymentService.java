package org.kobus.spring.service.pay;

import org.kobus.spring.domain.pay.FreepassPaymentDTO;
import org.kobus.spring.domain.pay.PaymentCommonDTO;
import org.kobus.spring.domain.pay.STPaymentSet;

public interface FreePassPaymentService {

    int processFreepassPayment(PaymentCommonDTO payDto, FreepassPaymentDTO freepassDto);
    
    boolean saveSeasonTicketPayment(STPaymentSet dto);
    
} // interface
