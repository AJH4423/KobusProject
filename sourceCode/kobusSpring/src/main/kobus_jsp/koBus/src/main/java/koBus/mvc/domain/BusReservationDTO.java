package koBus.mvc.domain;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter

public class BusReservationDTO {
    private String resId;             // 🔹 예매 ID (resID)
    private String userId;            // 🔹 회원 ID (kusID)
    private String busScheduleId;     // 🔹 운행 ID (bshID)
    private String seatNumber;        // 🔹 좌석 ID (seatID)
    private Date boardingDt;          // 🔹 탑승일자 (rideDate)
    private int totalPrice;           // 🔹 결제금액 (amount)

    // 🔽 예매 테이블 필드 중 빠진 항목 추가
    private Date resvDate;            // 🔹 예매일자 (resvDate)
    private String resvStatus;        // 🔹 예매 상태 (resvStatus)
    private String resvType;          // 🔹 예매 타입 (resvType)
    private int qrCode;               // 🔹 QR 코드 (qrCode)
    private int mileage;              // 🔹 마일리지 (mileage)
    private String seatAble;          // 🔹 좌석 가능 여부 (seatAble)
}

