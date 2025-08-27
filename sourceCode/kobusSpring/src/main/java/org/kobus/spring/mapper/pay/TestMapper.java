package org.kobus.spring.mapper.pay;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TestMapper {
    String getCurrentTime();
}
