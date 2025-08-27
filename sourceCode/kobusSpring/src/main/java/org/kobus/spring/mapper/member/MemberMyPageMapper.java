package org.kobus.spring.mapper.member;

import java.sql.SQLException;

import org.apache.ibatis.annotations.Param;

public interface MemberMyPageMapper {

	// 예매내역 개수 가져오는 함수 - DB
	int reservationCount(String auth) throws SQLException;

	// 정기권 개수 가져오는 함수 - DB
	int popCouponCount(String auth) throws SQLException;

	// 프리패스 쿠폰갯수 가져오는 함수 - DB
	int freeCouponCount(String auth) throws SQLException;

	// 전화번호 가져오는 함수 - DB
	String getTelNum(String auth) throws SQLException;

	// 비밀번호 가져오는 함수 - DB
	String getOldPw(String auth) throws SQLException;

	// 비밀번호 변경 - DB
	int updatePw(@Param("auth") String auth, @Param("changePw") String changePw) throws SQLException;

	// 휴대폰번호 변경 - DB
	int updateTel(@Param("auth") String auth, @Param("changeTel") String changeTel) throws SQLException;

	// 회원탈퇴 - DB
	int deleteUsr(@Param("auth") String auth) throws SQLException;


}
