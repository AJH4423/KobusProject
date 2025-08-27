package board.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import board.dto.BoardDTO;
import com.util.ConnectionProvider;
import koBus.mvc.command.CommandHandler;
import koBus.mvc.persistence.LogonDAO;
import koBus.mvc.persistence.LogonDAOImpl;

public class BoardEditHandler implements CommandHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String method = request.getMethod();
		HttpSession session = request.getSession();
		String id = (String) session.getAttribute("auth"); // 로그인된 사용자 ID

		if (id == null) {
			response.sendRedirect(request.getContextPath() + "/page/logonMain.do");
			return null;
		}

		Connection conn = ConnectionProvider.getConnection();
		LogonDAO logonDAO = new LogonDAOImpl(conn);
		String kusID = logonDAO.getKusIDById(id); // 실제 DB의 KUSxxx값

		if (kusID == null) {
			conn.close();
			System.out.println("로그인 사용자에 대한 kusID 조회 실패");
			response.sendRedirect(request.getContextPath() + "/html/boardList.do");
			return null;
		}

		if (method.equalsIgnoreCase("GET")) {
			int brdID = Integer.parseInt(request.getParameter("brdID"));
			BoardDTO dto = null;

			String sql = "SELECT * FROM board WHERE brdID = ?";
			try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
				pstmt.setInt(1, brdID);
				ResultSet rs = pstmt.executeQuery();

				if (rs.next()) {
					dto = new BoardDTO();
					dto.setBrdID(rs.getInt("brdID"));
					dto.setKusID(rs.getString("kusID"));
					dto.setBrdTitle(rs.getString("brdTitle"));
					dto.setBrdContent(rs.getString("brdContent"));
					dto.setBrdDate(rs.getTimestamp("brdDate"));
				}
			}

			if (dto == null) {
				conn.close();
				System.out.println("BoardEditHandler - 게시글 없음: brdID = " + brdID);
				response.sendRedirect(request.getContextPath() + "/html/boardList.do");
				return null;
			}

			if (!kusID.equals(dto.getKusID())) {
				conn.close();
				System.out.println("수정 권한 없음. 로그인 KUSID: " + kusID + ", 작성자: " + dto.getKusID());
				response.sendRedirect(request.getContextPath() + "/html/boardList.do");
				return null;
			}

			request.setAttribute("dto", dto);
			conn.close();
			return "/board/boardEdit.jsp";
		}

		if (method.equalsIgnoreCase("POST")) {
			int brdID = Integer.parseInt(request.getParameter("brdID"));
			String title = request.getParameter("brdTitle");
			String content = request.getParameter("brdContent");

			String sql = "UPDATE board SET brdTitle = ?, brdContent = ?, brdDate = SYSTIMESTAMP WHERE brdID = ?";

			try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
				pstmt.setString(1, title);
				pstmt.setString(2, content);
				pstmt.setInt(3, brdID);
				pstmt.executeUpdate();
			}

			conn.close();

			// ✅ 수정 후 해당 게시글 상세페이지로 이동
			response.sendRedirect(request.getContextPath() + "/html/boardView.do?brdID=" + brdID);
			return null;
		}

		conn.close();
		return null;
	}
}
