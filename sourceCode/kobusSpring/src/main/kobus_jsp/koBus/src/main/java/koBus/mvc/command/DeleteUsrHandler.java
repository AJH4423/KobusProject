package koBus.mvc.command;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.util.ConnectionProvider;

import koBus.mvc.persistence.MyPageDAO;
import koBus.mvc.persistence.MyPageDAOImpl;

public class DeleteUsrHandler implements CommandHandler{

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, Exception, Throwable {
		// 회원 삭제
		
		String result = "";
		
		System.out.println("> DeleteUsrHandler.process()...");
		HttpSession session = request.getSession();
		
		String auth = (String) session.getAttribute("auth");
		
		System.out.println("auth : " + auth);
		
		Connection conn = ConnectionProvider.getConnection();
		MyPageDAO dao = new MyPageDAOImpl(conn);
		
		try {
			
			result = dao.deleteUsr(auth);
			
			if (result.equals("success")) {
				System.out.println("업데이트 성공");
				if (session != null) {
					session.invalidate();  // 세션 무효화
				}
				
				response.sendRedirect("/koBus/main.do");
			} else {
				System.out.println("업데이트 실패");
			}
			
		} catch (Exception e) {
			System.out.println("> ChangePwHandler.process() Exception...");
			e.printStackTrace();
		}
		
		return null;
	}

}
