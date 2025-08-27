package org.kobus.spring.domain.pay;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentCommonDTO {
	
	private String paymentId;
	private String impUid;
	private String merchantUid;
	private String payMethod;
	private int amount;
	private String payStatus;
	private String pgTid;
	private Timestamp paidAt;
	private Timestamp regDt;

}
