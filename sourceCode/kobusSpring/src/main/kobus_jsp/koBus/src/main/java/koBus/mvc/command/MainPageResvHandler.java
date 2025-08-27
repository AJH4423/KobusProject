package koBus.mvc.command;

import java.io.IOException;
import java.sql.Connection;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.util.ConnectionProvider;

import koBus.mvc.domain.ResvDTO;
import koBus.mvc.persistence.ResvDAO;
import koBus.mvc.persistence.ResvDAOImpl;

public class MainPageResvHandler implements CommandHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, Exception, Throwable {
		System.out.println("> MainPageResvHandler.process() ...");
		
		Connection conn = ConnectionProvider.getConnection();
		ResvDAO dao = new ResvDAOImpl(conn);
		HttpSession session = request.getSession(false);
		String mainParam = request.getParameter("mainParam");
		
		 if (session == null || session.getAttribute("id") == null) {
		        // 로그인 안 된 상태
		        response.sendRedirect("/koBus/koBusFile/logonMain.jsp");
		        return null;
		}
		
		String loginId = (String) session.getAttribute("id");
		System.out.println("현재 로그인한 사용자 ID: " + loginId);
		
		List<ResvDTO> resvList = dao.searchResvList(loginId);
		
		request.setAttribute("resvList", resvList);
		
		response.setContentType("application/json; charset=UTF-8");
        
        Gson gson = new Gson();
        String json = gson.toJson(resvList); // Java 객체 → JSON 문자열로 변환 
        System.out.println("받아온 객체 값들 json 문자열로 변환");
        System.out.println(json);
         
        response.getWriter().write(json);
        return null;
	}

}
