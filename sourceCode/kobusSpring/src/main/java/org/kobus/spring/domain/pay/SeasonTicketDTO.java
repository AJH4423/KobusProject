package org.kobus.spring.domain.pay;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeasonTicketDTO {
	
	private String seasonPayId;
	private String paymentId;
	private String adtnPrdSno;
	private String kusid;
	private Date startDate;
	

	private String routeId;
	private String adtnPrdUseClsCd;
	private String adtnPrdUseClsNm;
	private String adtnPrdUsePsbDno;
	private String adtnPrdUseNtknCd;
	private String adtnPrdUseNtknNm;
	private String wkdWkeNtknCd;
	private String wkdWkeNtknNm;
	private int price;

}
