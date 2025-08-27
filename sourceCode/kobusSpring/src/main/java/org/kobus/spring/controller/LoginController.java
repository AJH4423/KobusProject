package org.kobus.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
public class LoginController {
	
	// 아이디찾기 페이지 get요청
	@GetMapping("/page/idSearch.do")
	public String idSearchPage() {
		return "kobus.login/idSearch";
	}
	// 비밀번호찾기 페이지 get요청
	@GetMapping("/page/passwdSearch.do")
	public String passwdSearchPage() {
		return "kobus.login/passwdSearch";
	}
	// 로그인 페이지 get요청
	@GetMapping("/page/logonMain.do")
	public String loginPage() {
		return "kobus.login/logonMain";
	}
	
}
