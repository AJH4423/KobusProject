package org.kobus.spring.domain.pay;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeasonTicketOptionDTO {
	
	private String adtnPrdSno;
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
