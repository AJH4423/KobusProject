package org.kobus.spring.domain.reservation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModifyResvDTO {
	private String mrsMrnpNo;
    private String deprnNm;
    private String deprCd;           // 출발지코드
    private String deprNm;           // 출발지명
    private String arvlCd;           // 도착지코드
    private String arvlNm;           // 도착지명

    // ================== 경로 구분 ==================
    private String pathDvs;          // 편도(sngl)/환승(trtr)/왕복(rtrp)
    private String pathStep;         // 왕복 단계 (1: 왕편, 2: 복편)

    // ================== 출발/도착 일자 및 시간 ==================
    private String deprDtm;          // 가는날 (편도)
    private String deprDtmAll;       // 가는날 (편도)
    private String arvlDtm;          // 오는날 (왕복)
    private String arvlDtmAll;       // 오는날 (왕복)
    private String deprDt;           // 출발일
    private String deprTime;         // 출발시간

    // ================== 버스/운수사 정보 ==================
    private String busClsCd;         // 버스등급
    private String indVBusClsCd;     // 선택한 버스등급
    private String busCode;          // 버스코드
    private String cacmCd;           // 운수사코드
    private String cacmNm;           // 운수사명

    // ================== 인원 수 ==================
    private String selSeatCnt;       // 선택 좌석 수
    private String selAdltCnt;       // 일반인 수
    private String selAdltDcCnt;     // 일반인 할인 수
    private String selChldCnt;       // 초등생 수
    private String selTeenCnt;       // 중고생 수
    private String selectedSeatIds;  // 선택좌석목록

    // ================== 금액 관련 ==================
    private String estmAmt;          // 예상금액
    private String dcAmt;            // 할인금액
    private String tissuAmt;         // 결제금액

    private String adltFee;          // 일반 금액 단가
    private String chldFee;          // 초등생 금액 단가
    private String teenFee;          // 중고생 금액 단가

    private String adltTotPrice;     // 일반 금액 총액
    private String chldTotPrice;     // 초등생 금액 총액
    private String teenTotPrice;     // 중고생 금액 총액
    private String allTotAmtPrice;   // 결제금액 총액

    // ================== 잔여좌석/총좌석 ==================
    private String rmnSatsNum;       // 잔여좌석수
    private String totSatsNum;       // 총좌석수

}
