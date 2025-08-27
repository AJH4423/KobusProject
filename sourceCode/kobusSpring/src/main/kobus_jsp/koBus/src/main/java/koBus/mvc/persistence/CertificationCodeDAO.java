package koBus.mvc.persistence;

import java.sql.SQLException;

import koBus.mvc.domain.JoinDTO;

// 회원가입 함수
public interface CertificationCodeDAO {
	
	// 전화번호 입력해서 인증번호받기
	String telCertificationNum(String inputNumber, int randomNumber) throws SQLException;
	
	// 회원가입한 회원정보 DB에 insert
	int insert(JoinDTO dto) throws SQLException;

}
