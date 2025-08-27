package koBus.mvc.persistence;

import java.util.List;

import koBus.mvc.domain.RegionDTO;


public interface RegionDAO {
	List<RegionDTO> selectAll(); 
	List<RegionDTO> selectBySidoCode(int sidoCode);
	
}
