package koBus.mvc.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ResvDTO {
	
	private String resId; 			/* 예매번호 */
	private String seatNo; 			/* 좌석번호 */
	private LocalDateTime rideDate; 		/* 탑승일 */
	private LocalDateTime resvDate; 		/* 예약일 */
	private String resvStatus; 		/* 예약상태 */
	private String resvType; 		/* 예약경로 (인터넷 or 모바일) */
	private String qrCode; 			/* 탑승 qrcode */
	private String deprRegCode; 	/* 출발지코드 */
	private String deprRegName; 	/* 출발지명 */
	private String arrRegCode; 		/* 도착지코드 */
	private String arrRegName; 		/* 도착지명 */
	private String comName;         /*고속사*/
	private String busGrade; 		/* 등급 */
	private int durMin;
	private int amount; 			/* 총 결제금액 */
	private String payMethod;
	private int totalCount; 		/* 총인원수 */
	private int aduCount; 		/* 일반좌석수 */
	private int stuCount; 		/* 학생좌석수 */
	private int chdCount; 		/* 아이좌석수 */
	
	private String rideDateStr;     /* 포맷된 탑승일 문자열 */
	private String resvDateStr;     /* 포맷된 예약일 문자열 */
	
	private String rideDateFormatter;
	

}
