package koBus.mvc.command;

import java.io.IOException;
import java.sql.Connection;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.util.ConnectionProvider;

import koBus.mvc.domain.ItemCanclePurDTO;
import koBus.mvc.domain.ItemPurDTO;
import koBus.mvc.persistence.ItemPurDAO;
import koBus.mvc.persistence.ItemPurDAOImpl;
import koBus.mvc.persistence.ResvDAO;
import koBus.mvc.persistence.ResvDAOImpl;

public class ItemPurListPageHandler implements CommandHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, Exception, Throwable {
		// 상품 구매내역 리스트 뿌려주는 페이지 
		System.out.println("> ItemPurListPageHandler.process() ...");
		
		Connection conn = ConnectionProvider.getConnection();
		ItemPurDAO dao = new ItemPurDAOImpl(conn);
		HttpSession session = request.getSession();
		
		if (session == null || session.getAttribute("id") == null) {
		        // 로그인 안 된 상태
		        response.sendRedirect("/koBus/koBusFile/logonMain.jsp");
		        return null;
		}
		
		String loginId = (String) session.getAttribute("id"); // 현재 로그인하고있는 회원의 id값
		
		List<ItemPurDTO> popItemList = dao.itemPopPurList(loginId);
		List<ItemPurDTO> freeItemList = dao.itemFreePurList(loginId);
		
		List<ItemCanclePurDTO> popCancleItemList = dao.itemCanclePopPurList(loginId);
		List<ItemCanclePurDTO> freeCancleItemList = dao.itemCancleFreePurList(loginId);
		
		request.setAttribute("popItemList", popItemList);
		request.setAttribute("freeItemList", freeItemList);
		request.setAttribute("popCancleItemList", popCancleItemList);
		request.setAttribute("freeCancleItemList", freeCancleItemList);
		
		return "/koBusFile/itemPurListPage.jsp";
	}

}
