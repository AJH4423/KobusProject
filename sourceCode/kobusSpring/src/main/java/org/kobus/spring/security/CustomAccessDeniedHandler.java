package org.kobus.spring.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import lombok.extern.log4j.Log4j;

//403 접근 금지 에러를 다양한 처리를  직접하기 위한 클래스 (객체)
@Component
@Log4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler{

	@Override
	public void handle(
			HttpServletRequest request
			, HttpServletResponse response,
			AccessDeniedException accessDeniedException
			) throws IOException, ServletException {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		if (auth != null && auth.getPrincipal() instanceof User) {
			User user = (User) auth.getPrincipal();
			log.error("👉 현재 로그인한 사용자 ID: " + user.getUsername());
			log.error(" 에러뜨는 권한: " + user.getAuthorities());
		} else {
			log.error("👉 인증 정보가 없거나 알 수 없음");
		}

		// 윈도우 + .
		log.error("👌👌👌 Access Denied Handler");
		log.error("👌👌👌 Redirect...");
		// 개발자 직접 하고자 하는 다양한 처리  코딩.
		response.sendRedirect("/koBus/page/logonMain.do");
	}

}
