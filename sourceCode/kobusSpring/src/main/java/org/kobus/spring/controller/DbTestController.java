package org.kobus.spring.controller;

import org.kobus.spring.mapper.pay.TestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class DbTestController {

    @Autowired
    private TestMapper testMapper;

    @GetMapping("/db-time.htm")
    public String testDbConnection() {
        return "🕒 현재 DB 시간: " + testMapper.getCurrentTime();
    }
}

