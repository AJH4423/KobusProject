package org.kobus.spring.domain.pay;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class FreePassDTO {
	
	private String freePassPayId;
	private String paymentId;
	private String adtnPrdSno;
	private String kusid;
	private Date startDate;
	
	
    private String adtnPrdUseClsCd;
    private String adtnPrdUseClsNm;
    private int adtnPrdUsePsbDno;
    private String adtnPrdUseNtknCd;
    private String adtnPrdUseNtknNm;
    private String wkdWkeNtknCd;
    private String wkdWkeNtknNm;
    private String tempAlcnTissuPsbYn;
    private String adtnDcYn;
    private int amount;

}
