package koBus.mvc.domain;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter

public class BusReservationDTO {
	private String resId;           // 🔹 예매 ID (res_id)
    private String userId;
    private String busScheduleId;
    private String seatNumber;
    private Date boardingDt;
    private int totalPrice;

}
