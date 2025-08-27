package com.filter;

import java.io.IOException;
import javax.servlet.DispatcherType;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet Filter implementation class LogonCheckFilter
 */
@WebFilter(
		dispatcherTypes = {DispatcherType.REQUEST }
					, 
		urlPatterns = { 
				// 마이페이지 등등 권한 필요한 주소 추가할것. 
				"/page/logonMyPage.do"
		})
public class LogonCheckFilter extends HttpFilter implements Filter {

    public LogonCheckFilter() {
        super();
    }

	public void destroy() {
		
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		System.out.println("> LogonCheckFilter doFilter()");
		
		HttpServletRequest hrequest = (HttpServletRequest) request;
		HttpServletResponse hresponse = (HttpServletResponse) response;
		
		String logonId = null;
		boolean isAuth = false;
		HttpSession session = hrequest.getSession(false);
		
		if (session != null) {
			logonId = (String) session.getAttribute("auth");
			if (logonId != null) {
				isAuth = true;
			}
		}
		
		String referer = hrequest.getRequestURI();
		
		if (isAuth) {
			// 인증 o 체크
			// 관리자 x
			chain.doFilter(request, response);
		}else {
		    // 필터 확인해서 로그인 안되어있으면 로그인 페이지로 이동...
		    String location = "/koBus/page/logonMain.do";
			hresponse.sendRedirect(location);
		}
	}

	public void init(FilterConfig fConfig) throws ServletException {
		System.out.println("> LoginCheckFilter.init()...");
	}

}
