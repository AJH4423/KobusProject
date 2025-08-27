package org.kobus.spring.mapper.pay;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.kobus.spring.domain.pay.FreePassDTO;
import org.kobus.spring.domain.pay.ResPassUsageDTO;

public interface FreePassMapper {
    List<FreePassDTO> selectFreePassListByKusid(String kusid);
    List<ResPassUsageDTO> selectUsedDatesByKusid(String kusid);
    // 프리패스 단건 조회
    FreePassDTO selectFreePassByCpnNo(String adtnCpnNo);

    // 프리패스를 이용한 reservation insert
    void insertReservationForFreePass(@Param("dto") FreePassDTO dto, 
                                      @Param("usedDate") String usedDate,
                                      @Param("kusid") String kusid);
}
