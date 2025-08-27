package koBus.mvc.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class RouteDTO {
	private String rouID; 		
	private String comID; 		
	private String arrID; 		
	private String depID; 		
	private int duration; 	
	private int fare; 	
}


class ArriveDTO {
	private String arrID;
	private String regID;
}

class DepartureDTO {
	private String depID;
	private String regID;
}

/*
class RegionDTO {
	private String regID;
	private String regName;
	private String sidoCode;
}
*/

