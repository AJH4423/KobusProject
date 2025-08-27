package org.kobus.spring.domain.pay;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TermsAgreeDTO {
	
	private String agreeId;
	private int termsId;
	private String kusid;
	private String resId;
	private String version;
	private Date agreeDate;

}
