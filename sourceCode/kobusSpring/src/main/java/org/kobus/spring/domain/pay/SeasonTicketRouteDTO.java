package org.kobus.spring.domain.pay;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeasonTicketRouteDTO {
	
	private String routeId;
	private String deprNm;
	private String arvlNm;
	private String adtnPrdSellSttDt;
	
	private String subRouteId;
	private String adtnDeprNm;
	private String adtnArvlNm;
	private String adtnDeprCd;
	private String adtnArvlCd;

}
