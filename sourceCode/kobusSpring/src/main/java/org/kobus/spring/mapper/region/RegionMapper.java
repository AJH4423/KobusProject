package org.kobus.spring.mapper.region;

import java.util.List;

import org.kobus.spring.domain.region.RegionDTO;

public interface RegionMapper {
    
    List<RegionDTO> selectAll();
    
    List<RegionDTO> selectBySidoCode(int sidoCode);

}
