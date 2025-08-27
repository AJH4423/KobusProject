package koBus.mvc.command;

import java.sql.Connection;
import java.sql.SQLException;

import javax.naming.NamingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.util.ConnectionProvider;

import koBus.mvc.persistence.LogonDAO;
import koBus.mvc.persistence.LogonDAOImpl;

public class LogonOkHandler implements CommandHandler {
	
	@Override
	public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String location = "/koBus/main.do";
		System.out.println("> LogonOkHandler.process() ... Get");
		
		HttpSession session = request.getSession();
		// String referer = (String)session.getAttribute("referer");
		// System.out.println("> referer : " + referer);
		
		String id = request.getParameter("usrId").trim();
		String passwd = request.getParameter("usrPwd").trim();
		String sourcePage = request.getParameter("sourcePage");
		
		System.out.println("id : " + id);
		System.out.println("passwd : " + passwd);
		System.out.println("sourcePage : " + sourcePage);
		
		Connection conn = ConnectionProvider.getConnection();
		LogonDAOImpl dao = new LogonDAOImpl(conn); 
		
		try {
			if (dao.logonCheck(id, passwd) == 1) {
				System.out.println("로그인 성공");
				
				session.setAttribute("auth", id);
				session.setAttribute("id", id);
				
				session.setAttribute("result", dao.logonCheck(id, passwd));
				location += "?logon=success";	
				
				System.out.println("location" + location); 
				
				// 로그인 성공 : 리다이렉트
				
			} else {
				System.out.println("로그인 실패");
				request.setAttribute("result", dao.logonCheck(id, passwd));
				location = "/koBusFile/logonMain.jsp?logon=fail";
				
				System.out.println("location" + location);
				
				// 로그인 실패 : 포워딩	
				return location;
			}
		} catch (SQLException e) {
			System.out.println("> LogonOkHandler.process() ... Exception");
			e.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		System.out.println("location" + location);
				
		if (sourcePage != null && sourcePage.equals("reservationCheck.jsp")) {
			location="/koBus/manageReservations.do";
			System.out.println("예매확인 로그인 주소 : " + location);
			response.sendRedirect(location);	
			return null; // 예매 확인/취소/변경 페이지로 이동
		} else {
			response.sendRedirect(location);
			return null;
		}
		
	} // process

} // LogonOkHandler
