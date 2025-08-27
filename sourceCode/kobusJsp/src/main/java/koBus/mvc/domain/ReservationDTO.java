package koBus.mvc.domain;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationDTO {
    private String resID;
    private String bshID;
    private String seatID;
    private String kusID;
    private Date rideDate;
    private Date resvDate;
    private String resvStatus;
    private String resvType;
    private int qrCode;
    private int mileage;
    private String seatAble;
    private SeatDTO seatInfo; // 좌석 상세정보
    private ScheduleDTO busSchedule; // 운행정보
    // getter, setter 등 생략
}
