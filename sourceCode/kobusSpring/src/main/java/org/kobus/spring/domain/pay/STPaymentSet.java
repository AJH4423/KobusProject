package org.kobus.spring.domain.pay;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class STPaymentSet {
	
	// payment_common (공통 결제 정보)
    private String impUid;
    private String merchantUid;
    private String payMethod;
    private int amount;
    private String payStatus;
    private String pgTid;
    private Timestamp paidAt;

	
	/* SeasonTicketPaymentDTO */
	private String seasonPayId;
	private String paymentId;

	private String kusid;
	private Date startDate;
	
	/* SeasonTicketOptionDTO */
	private String adtnPrdSno;

	private String adtnPrdUseClsCd;
	private String adtnPrdUseClsNm;
	private String adtnPrdUsePsbDno;
	private String adtnPrdUseNtknCd;
	private String adtnPrdUseNtknNm;
	private String wkdWkeNtknCd;
	private String wkdWkeNtknNm;
	private int price;
	
	/* SeasonTicketRouteDTO */
	private String routeId;
	private String deprNm;
	private String arvlNm;
	private String adtnPrdSellSttDt;
	
	/* 서브노선 */
	private String subRouteId;
	private String adtnDeprNm;
	private String adtnArvlNm;
	private String adtnDeprCd;
	private String adtnArvlCd;

}
