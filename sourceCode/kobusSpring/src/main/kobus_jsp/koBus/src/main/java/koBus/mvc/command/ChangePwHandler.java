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

public class ChangePwHandler implements CommandHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, Exception, Throwable {
		
		System.out.println("> ChangePwHandler.process()...");
		HttpSession session = request.getSession();
		
		String auth = (String) session.getAttribute("auth");
		String usrPwd = request.getParameter("usrPwd");
		
		System.out.println("auth : " + auth);
		
		Connection conn = ConnectionProvider.getConnection();
		MyPageDAO dao = new MyPageDAOImpl(conn);
		LogonDAO logDao = new LogonDAOImpl(conn);
		
		String encryptPasswd = logDao.encrypt(usrPwd); 
		
		try {
			
			int result = dao.updatePw(auth, encryptPasswd);
			
			if (result == 1) {
				System.out.println("업데이트 성공");
			} else {
				System.out.println("업데이트 실패");
			}
			
		} catch (Exception e) {
			System.out.println("> ChangePwHandler.process() Exception...");
			e.printStackTrace();
		}
		
		return "/page/logonMyPage.do";
	}

}
