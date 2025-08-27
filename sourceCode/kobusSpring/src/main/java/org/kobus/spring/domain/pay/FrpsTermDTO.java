package org.kobus.spring.domain.pay;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FrpsTermDTO {
	
	private String adtnPrdSno;
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
