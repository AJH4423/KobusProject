package org.kobus.spring.domain.pay;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeasonTicketPaymentDTO {
	
	private String seasonPayId;
	private String paymentId;
	private String adtnPrdSno;
	private String kusid;
	private Date startDate;

}
