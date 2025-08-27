package koBus.mvc.domain;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FreePassPaymentDTO {
    private int freePassPaymentId; // FREE_PASS_PAYMENT_ID
    private String userId;         // USER_ID
    private String adtnPrdSno;     // ADTN_PRD_SNO
    private String impUid;         // IMP_UID
    private String merchantUid;    // MERCHANT_UID
    private String payMethod;      // PAY_METHOD
    private int amount;            // AMOUNT
    private String payStatus;      // PAY_STATUS
    private String pgTid;          // PG_TID
    private Date paidAt;           // PAID_AT
    private Date regDt;            // REG_DT
    private Date startdate;            // REG_DT
}
