package org.kobus.spring.domain.join;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JoinDTO {
	private String tel; // 회원 전화번호(세션으로 넘겨주는값 받을것)
	private String subEmail; // 회원 보조이메일
	private String id; // 회원 아이디
	private String passwd; // 회원 비밀번호 
	private String birth; // 회원 탄생년도 
	private String gender; // 회원 성별 : 남(1),여(2)
	private String joinDate; // 회원가입 날짜
}
