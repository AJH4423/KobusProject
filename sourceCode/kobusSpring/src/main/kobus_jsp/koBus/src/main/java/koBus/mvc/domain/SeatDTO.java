package koBus.mvc.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class SeatDTO {

	private String seatId; 		/* 좌석 ID */
	private String busId; 		/* 버스 ID */
	private int seatNo; 		/* 좌석 번호 */
	private String seatType; 	/* 좌석 유형 */
	private String seatAble; 	/* 예매 유무 */


	

}
