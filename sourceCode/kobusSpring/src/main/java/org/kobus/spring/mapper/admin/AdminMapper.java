package org.kobus.spring.mapper.admin;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface AdminMapper {
	
	// 전체회원, 회원, 관리자 통계내는 차트
	List<Map<String, Object>> getUserCountsByRank() throws SQLException;
	
	// 총 예매 + 총 결제금액
	List<Map<String, Object>> gerTotalInfo() throws SQLException;
	
	// 쿠폰 구매 갯수
	List<Map<String, Object>> getCouponCount() throws SQLException;
	
}
