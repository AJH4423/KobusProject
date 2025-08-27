package koBus.mvc.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdtnPrdDTO {
    private String adtnCpnNo;         // 부가상품 번호
    private String adtnPrdKndCd;      // 부가상품 종류 (2:정기권, 3:프리패스)
    private String adtnPrdUsePsbDno;  // 사용가능 일수
    private String wkdWkeNtknNm;      // 주중/주말
    private String adtnPrdUseClsNm;   // 사용등급
    private String exdtSttDt;         // 유효시작일
    private String exdtEndDt;         // 유효종료일
    private String adtnPrdUseNtknNm;  // 사용권종
    private String pubUserNo;         // 발행 사용자번호
}