package koBus.mvc.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RouteLineDTO {
    private String routeId;
    private String startName;
    private String endName;
    private String sellStartDate;

    // Getters / Setters
}
