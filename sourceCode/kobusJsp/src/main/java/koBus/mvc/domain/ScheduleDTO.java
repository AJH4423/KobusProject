package koBus.mvc.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ScheduleDTO {
	private String regID;
	private String regName;
	private int sidoCode;
	private String deprRegName;
	private String arrRegName;
	private LocalDateTime departureDate;    /*출발일자*/
	private String comName;             	/*고속사*/
	private String busGrade;            	/*등급*/
	private int adultFare;           		/*어른요금*/
	private int stuFare;             		/*중고생요금*/
	private int childFare;           		/*초등생요금*/
	private LocalDateTime arrivalDate;      /*도착일자*/
	private int durMin; 					/* 소요시간 */
	private String bshId; 					/* 버스스케줄 ID */
	private String rouId; 					/* 노선 ID */
	private String busId; 					/* 버스 ID */
	private int remainSeats; 				/* 잔여석 */
    private int busSeats;    				/*총 좌석*/
    private int duration;
}


