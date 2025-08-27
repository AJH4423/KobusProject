package koBus.mvc.persistence;

import java.sql.SQLException;

public interface MyPageDAO {

	// 예매내역 개수 가져오는 함수
	int reservationCount(String auth) throws SQLException;
	
	// 정기권 개수 가져오는 함수
	int popCouponCount(String auth) throws SQLException;
	
	// 프리패스 쿠폰갯수 가져오는 함수
	int freeCouponCount(String auth) throws SQLException;
	
	// 전화번호 가져오는 함수
	String getTelNum(String auth) throws SQLException;
	
	// 비밀번호 가져오는 함수
	String getOldPw(String auth) throws SQLException;
	
	// 비밀번호 변경
	int updatePw(String auth, String changePw) throws SQLException;
	
	// 휴대폰번호 변경
	int updateTel(String auth, String changeTel) throws SQLException;
	
	// 회원탈퇴
	String deleteUsr(String auth) throws SQLException; 
}
