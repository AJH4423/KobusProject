package org.kobus.spring.service.join;

import java.sql.SQLException;

import org.kobus.spring.domain.join.AuthDTO;
import org.kobus.spring.domain.join.JoinDTO;

public interface JoinService {

	// 전화번호 입력해서 인증번호받기
	String telCertificationNum(String inputNumber, int randomNumber) throws SQLException;

	// 회원가입한 회원정보 DB에 insert
	int insert(JoinDTO dto) throws SQLException;

	// 권한 테이블에 정보입력
	int insertAuth(AuthDTO dto) throws SQLException;
	
	// 아이디 중복체크
	String idDupCheck(String inputId) throws SQLException;

}
