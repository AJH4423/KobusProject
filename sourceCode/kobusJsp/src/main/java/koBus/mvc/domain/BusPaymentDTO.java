package koBus.mvc.domain;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter

public class BusPaymentDTO {
	private String resId;
    private int paymentId;
    private String userId;
    private String impUid;
    private String merchantUid;
    private String payMethod;
    private int amount;
    private String payStatus;
    private String pgTid;
    private Date paidAt;
}
