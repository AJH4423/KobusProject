package org.kobus.spring.domain.pay;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TermsDTO {
	
	private int termsId;
	private String termsType;
	private String title;
	private String version;
	private String content;
	private Date regDate;

}
