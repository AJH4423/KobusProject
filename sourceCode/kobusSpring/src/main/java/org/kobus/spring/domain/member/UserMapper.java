package org.kobus.spring.domain.member;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    String getKusIDById(String id);
}