package koBus.mvc.command;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.util.ConnectionProvider;

import koBus.mvc.persistence.LogonDAO;
import koBus.mvc.persistence.LogonDAOImpl;
import koBus.mvc.persistence.MyPageDAO;
import koBus.mvc.persistence.MyPageDAOImpl;

public class OldPwCheckOkHandler implements CommandHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, Exception, Throwable {
		// 현재비밀번호 가져와서 같은지 확인 
		
		String result="";
		
		HttpSession session = request.getSession();
		System.out.println("> OldPwCheckOkHandler.process()...");
		
		String inputPw = request.getParameter("checkPw");
		System.out.println("inputPw: " + inputPw);
		String auth = (String) session.getAttribute("auth");
		
		Connection conn = ConnectionProvider.getConnection();
		MyPageDAO dao = new MyPageDAOImpl(conn);
		LogonDAO logDao = new LogonDAOImpl(conn);
		
		
		try {
			
			String encryptPasswd = logDao.encrypt(inputPw);
			String oldPw = dao.getOldPw(auth);
			
			System.out.println("encryptPasswd: " + encryptPasswd );
			System.out.println("oldPw: " + oldPw );
			
			if (encryptPasswd.equals(oldPw)) {
				result="success";
				System.out.println(result);
				response.setContentType("text/plain; charset=UTF-8");
			    response.getWriter().write(result);
			} else {
				result="fail";
				System.out.println(result);
				response.setContentType("text/plain; charset=UTF-8");
			    response.getWriter().write(result);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			conn.close();
		}

		return null;
	}

}
