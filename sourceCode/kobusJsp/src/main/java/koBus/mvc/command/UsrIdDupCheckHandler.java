package koBus.mvc.command;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.util.ConnectionProvider;

import koBus.mvc.persistence.LogonDAO;
import koBus.mvc.persistence.LogonDAOImpl;

public class UsrIdDupCheckHandler implements CommandHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, Exception {
		// id 중복확인
		System.out.println("> UsrIdDupCheckHandler.process() ... Get");
		
		String id = request.getParameter("checkid");
		System.out.println("검사할 id : " + id);
		
		
		Connection conn = ConnectionProvider.getConnection();
		System.out.println("연결부분: " + conn);
		LogonDAO dao = new LogonDAOImpl(conn);
		
		String result = dao.idDupCheck(id);    
		
		System.out.println("조회 결과 : " + result);
		
		try {
			if (result.equals("success")) {
				// 아이디 존재하면 success보내기
				System.out.println("아이디 정보가 존재합니다.");
				response.setContentType("text/plain; charset=UTF-8");
			    response.getWriter().write(result);
			} else {
				// 아이디 존재안하면 fail보내기
				System.out.println("아이디 사용가능");
				response.setContentType("text/plain; charset=UTF-8");
			    response.getWriter().write(
			        (result != null && !result.isEmpty()) ? result : "error"
			    );
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			conn.close();
		}
		
		return null;
	}

}
