package koBus.mvc.command;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.util.ConnectionProvider;

import koBus.mvc.persistence.ItemPurDAO;
import koBus.mvc.persistence.ItemPurDAOImpl;

public class DeleteItemPurListHandler implements CommandHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, Exception, Throwable {
		// 정기권, 프리패스 선택한 상품의 식별번호 가져와서 쿼리문 수행하기
		
		String location = "/koBus/page/itemPurListPage.do";
		
		HttpSession session = request.getSession();
		String id = (String) session.getAttribute("id");
		String popItemId = request.getParameter("popItemId");
		String freeItemId = request.getParameter("freeItemId");
		
		System.out.println("pop : " + popItemId);
		System.out.println("free : " + freeItemId);
		
		Connection conn = ConnectionProvider.getConnection();
		ItemPurDAO dao = new ItemPurDAOImpl(conn);
		int result = 0;
		
		if (popItemId.equals("")) {
			result = dao.freeDelete(id, freeItemId);
			if (result == 1) {
				System.out.println("프리패스 결제정보 수정");
				response.sendRedirect(location);
			} else {
				System.out.println("결제정보 수정 오류");
			}
			
		} else if(freeItemId.equals("")) {
			result = dao.popDelete(id, popItemId);
			if (result == 1) {
				System.out.println("정기권 결제정보 수정");
				response.sendRedirect(location);
			} else {
				System.out.println("결제정보 수정 오류");
			}			
		} else {
			System.out.println("오류발생");
			response.sendRedirect(location);
		}
		
		return null;
	}

}
