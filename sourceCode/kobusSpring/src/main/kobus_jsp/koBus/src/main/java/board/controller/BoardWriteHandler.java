package board.controller;

import java.sql.Connection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.util.ConnectionProvider;

import board.dao.BoardDAO;
import board.dto.BoardDTO;
import koBus.mvc.command.CommandHandler;

public class BoardWriteHandler implements CommandHandler {
	@Override
	public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		String kusID = (String) session.getAttribute("auth"); // 로그인한 사용자 ID

		if (kusID == null) {
			response.sendRedirect(request.getContextPath() + "/page/logonMain.do");

			return null;
		}

		if (request.getMethod().equalsIgnoreCase("GET")) {
			return "/board/boardWrite.jsp";
		} else if (request.getMethod().equalsIgnoreCase("POST")) {
			// 요청 파라미터 수집
			String title = request.getParameter("brdTitle");
			String content = request.getParameter("brdContent");

			BoardDTO dto = new BoardDTO();
			dto.setKusID(kusID.trim());
			dto.setBrdTitle(title);
			dto.setBrdContent(content);
			dto.setBrdViews(0); // ← 신규 글이므로 조회수는 0

			Connection conn = ConnectionProvider.getConnection();
			BoardDAO dao = new BoardDAO(conn);
			int result = dao.insertBoard(dto);
			conn.close();

			response.sendRedirect(request.getContextPath() + "/html/boardList.do");

			return null;
		}

		return null;
	}
}
