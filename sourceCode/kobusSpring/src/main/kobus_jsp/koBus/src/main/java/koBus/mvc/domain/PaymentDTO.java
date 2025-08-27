package koBus.mvc.domain;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentDTO {
    private int paymentId;
    private String userId;
    private String impUid;
    private String merchantUid;
    private String payMethod;
    private int amount;
    private String payStatus;
    private String pgTid;
    private Date paidAt;
    private String adtnPrdSno;
    private String routeId;
    private Date startDate;


    // 생성자, getter, setter 생략 (필요시 자동 생성)
    // 우클릭 > Source > Generate Getter and Setter
}
