package org.kobus.spring.mapper.join;

import java.sql.SQLException;

import org.apache.ibatis.annotations.Param;
import org.kobus.spring.domain.join.AuthDTO;
import org.kobus.spring.domain.join.JoinDTO;


public interface JoinMapper {
		
		// 회원가입한 회원정보 DB에 insert
		int insert(JoinDTO dto) throws SQLException;
		
		// 권한 테이블에 정보입력
		int insertAuth(AuthDTO dto) throws SQLException;
		
		// 아이디 중복체크
		String idDupCheck(String inputId) throws SQLException;

}
