package org.kobus.spring.domain.region;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegionDTO {
    private String regID;
    private String regName;
    private int sidoCode;
}
