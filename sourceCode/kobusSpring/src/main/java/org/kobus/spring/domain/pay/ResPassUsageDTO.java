package org.kobus.spring.domain.pay;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResPassUsageDTO {
	
	private String usageId;
	private String resId;
	private String fpCpnNo;
	private Date timDte;

}
