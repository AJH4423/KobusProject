package koBus.mvc.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseOptionDTO {
    private String optionId;
    private String useClsCd;
    private String useClsNm;
    private String useDays;
    private String periodCd;
    private String periodNm;
    private String busGradeCd;
    private String busGradeNm;

    // Getter / Setter
}

