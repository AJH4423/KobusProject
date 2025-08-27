package org.kobus.spring.service.member;

import java.sql.SQLException;

import org.kobus.spring.mapper.member.MemberMyPageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberMyPageServiceImpl implements MemberMyPageService{
	
	@Autowired
	private MemberMyPageMapper memberMyPageMapper;
	
	// 예매내역 개수 가져오는 함수
	@Override
	public int reservationCount(String auth) throws SQLException {
		
		return memberMyPageMapper.reservationCount(auth);
	}
	
	// 정기권 개수 가져오는 함수
	@Override
	public int popCouponCount(String auth) throws SQLException {
		
		return memberMyPageMapper.popCouponCount(auth);
	}
	
	// 프리패스 쿠폰갯수 가져오는 함수
	@Override
	public int freeCouponCount(String auth) throws SQLException {
		
		return memberMyPageMapper.freeCouponCount(auth);
	}
	
	// 전화번호 가져오는 함수
	@Override
	public String getTelNum(String auth) throws SQLException {
		
		return memberMyPageMapper.getTelNum(auth);
	}
	
	// 비밀번호 가져오는 함수
	@Override
	public String getOldPw(String auth) throws SQLException {
		
		return memberMyPageMapper.getOldPw(auth);
	}
	
	// 비밀번호 변경
	@Override
	public int updatePw(String auth, String changePw) throws SQLException {
		
		return memberMyPageMapper.updatePw(auth, changePw);
	}
	
	// 휴대폰번호 변경
	@Override
	public int updateTel(String auth, String changeTel) throws SQLException {
		
		return memberMyPageMapper.updateTel(auth, changeTel);
	}
	
	// 회원탈퇴
	@Override
	public int deleteUsr(String auth) throws SQLException {
		
		return memberMyPageMapper.deleteUsr(auth);
	}

}
