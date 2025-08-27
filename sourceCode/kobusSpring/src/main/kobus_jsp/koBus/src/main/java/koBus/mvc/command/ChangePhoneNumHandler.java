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

public class ChangePhoneNumHandler implements CommandHandler{

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, Exception, Throwable {
		// 휴대폰번호 입력핟고 비밀번호변경 누르면 db정보에 번호변경완료 + 마이페이지로 돌아가기
		System.out.println("> ChangePhoneNumHandler.process()...");
		HttpSession session = request.getSession();
		
		String auth = (String) session.getAttribute("auth");
		String usrHp = request.getParameter("usrHp");
		
		System.out.println("auth : " + auth);
		
		Connection conn = ConnectionProvider.getConnection();
		MyPageDAO dao = new MyPageDAOImpl(conn);
		
		try {
			
			int result = dao.updateTel(auth, usrHp);
			
			if (result == 1) {
				System.out.println("업데이트 성공");
			} else {
				System.out.println("업데이트 실패");
			}
			
		} catch (Exception e) {
			System.out.println("> ChangePhoneNumHandler.process() Exception...");
			e.printStackTrace();
		}
		
		
		return "/page/logonMyPage.do";
	}

}
