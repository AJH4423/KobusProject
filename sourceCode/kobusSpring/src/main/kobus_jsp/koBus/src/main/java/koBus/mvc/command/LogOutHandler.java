package koBus.mvc.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LogOutHandler implements CommandHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		/*
		HttpSession session = request.getSession();
		session.invalidate();
		return "/koBusFile/logonMain.jsp";
		*/
		
		HttpSession session = request.getSession(false);  // 이미 존재하는 세션만 가져오기
		if (session != null) {
			session.invalidate();  // 세션 무효화
		}
		
		response.sendRedirect("/koBus/page/logonMain.do?logout=ok");  // 클라이언트에게 리다이렉트 지시
		return null;  // 직접 응답을 완료했기 때문에 null 리턴
		
	}

}
