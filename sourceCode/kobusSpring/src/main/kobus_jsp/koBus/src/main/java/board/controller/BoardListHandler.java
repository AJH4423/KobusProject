package board.controller;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException; // SQLException 임포트
import java.util.List;
import java.util.Collections; // Collections.emptyList()를 위해 추가

import javax.naming.NamingException; // NamingException 임포트
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import board.dao.BoardDAO;
import board.dto.BoardDTO;
import koBus.mvc.command.CommandHandler;

// 글 목록 보기
public class BoardListHandler implements CommandHandler {
	public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		// 이 try-catch는 process 메서드 자체의 throws Exception과 중복될 수 있으므로 필요없을 수 있음
		// 다만, 인코딩 설정이 실패하는 경우를 명시적으로 잡으려면 유지
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		response.setContentType("text/html; charset=UTF-8");

		System.out.println("> boardListHandler...");

		List<BoardDTO> list = null;
		BoardDAO dao = new BoardDAO();

		try {
			String keyword = request.getParameter("keyword");

			if (keyword != null && !keyword.trim().isEmpty()) {
			    list = dao.searchBoard(keyword);
			} else {
			    list = dao.getBoardList();
			}

		} catch (SQLException | NamingException e) { // DAO에서 던진 예외를 여기서 잡음
		    System.err.println("BoardListHandler - 게시글 목록 조회 중 DB/JNDI 오류: " + e.getMessage());
		    e.printStackTrace();
		    request.setAttribute("error", "게시글 목록을 불러오는 중 시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요. (에러: " + e.getMessage() + ")");
		    list = Collections.emptyList(); // 오류 발생 시 빈 리스트를 반환하여 JSP에서 NPE 방지
		} catch (Exception e) { // 그 외 예상치 못한 모든 예외 처리
		    System.err.println("BoardListHandler - 예상치 못한 오류 발생: " + e.getMessage());
		    e.printStackTrace();
		    request.setAttribute("error", "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
		    list = Collections.emptyList();
		}


		request.setAttribute("list", list);
		return "/board/boardList.jsp"; // 원래 페이지 유지
	}
}