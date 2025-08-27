package koBus.mvc.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class LogonDTO {
	
	private String id;	// 회원id
	private String passwd; // 회원비밀번호

}
