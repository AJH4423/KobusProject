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

public class LogonMyPageHandler implements CommandHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, Exception, Throwable {
		System.out.println("> LogonMyPageHandler.process()...");
		
		// 세션에 담겨있는 auth를 이용해 
		// 예매내역 행갯수, 프리패스/정기권 행개수, 휴대폰번호를 가져와서 페이지에 뿌려줌 
		HttpSession session = request.getSession();
		String auth = (String) session.getAttribute("auth");
		
		System.out.println("auth : " + auth);
		
		Connection conn = ConnectionProvider.getConnection();
		MyPageDAO dao = new MyPageDAOImpl(conn);
		
		try {
			int reservationCount = dao.reservationCount(auth);
			int couponCount = dao.popCouponCount(auth);
			couponCount += dao.freeCouponCount(auth);
			String tel = dao.getTelNum(auth);
			
			request.setAttribute("reservationCount", reservationCount);
			request.setAttribute("couponCount", couponCount);
			request.setAttribute("tel", tel);
			
		} catch (Exception e) {
			System.out.println("> LogonMyPageHandler.process() ... Exception");
			e.printStackTrace();
		} finally {
			conn.close();
		}
		
		return "/koBusFile/logonMyPage.jsp";
	}
	
}
