package koBus.mvc.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusTicketDTO {
    private String deprCd;       // 출발지 코드
    private String deprNm;       // 출발지 이름
    private String arvlCd;       // 도착지 코드
    private String arvlNm;       // 도착지 이름
    private String deprDt;       // 출발일자
    private String deprTime;     // 출발시각
    private String busClsCd;     // 버스등급
    private String alcnDeprTrmlNo; // 출발터미널번호
    private String alcnArvlTrmlNo; // 도착터미널번호
    private String selSeatNum;   // 좌석번호 (복수일 경우 쉼표구분)
    private String selAdltCnt;   // 성인 수
    private String selChldCnt;   // 아동 수
    private String selTeenCnt;   // 청소년 수
    private String adltFee;      // 성인 운임
    private String chldFee;      // 아동 운임
    private String teenFee;      // 청소년 운임
    private String arvlTime;      // 도착시각
    private String takeDrtmOrg;   // 총 소요시간
}
