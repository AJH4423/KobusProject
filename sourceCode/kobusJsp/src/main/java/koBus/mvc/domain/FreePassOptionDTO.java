package koBus.mvc.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FreePassOptionDTO {
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
    
}