package org.kobus.spring.domain.member;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemCanclePurDTO {
	private int couponID; // 프리패스, 정기권 식별번호(시퀀스)
	private String couponName; // 프리패스, 정기권인지 나태내는 변수
	private String payStatus; // 결제상태
	private Date startDate; // 사용시작일
	private int amount; // 결제금액
}
