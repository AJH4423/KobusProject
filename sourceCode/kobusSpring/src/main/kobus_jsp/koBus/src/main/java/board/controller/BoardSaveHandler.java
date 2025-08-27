package board.controller;

import java.sql.Connection;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.util.ConnectionProvider;

import board.dao.BoardDAO;
import board.dto.BoardDTO;
import koBus.mvc.command.CommandHandler;
import koBus.mvc.persistence.LogonDAO;
import koBus.mvc.persistence.LogonDAOImpl;

public class BoardSaveHandler implements CommandHandler {
    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception, SQLException {
        HttpSession session = request.getSession();
        String id = (String) session.getAttribute("auth");  // 로그인 시 저장된 'id' (예: user1)

        if (id == null) {
            response.sendRedirect("page/logonMain.do");
            return null;
        }

        String title = request.getParameter("brdTitle");
        String content = request.getParameter("brdContent");

        Connection conn = ConnectionProvider.getConnection();

        // 🔁 id → kusID 조회 (외래키 매칭용)
        LogonDAO logonDAO = new LogonDAOImpl(conn);
        String kusID = logonDAO.getKusIDById(id);

        BoardDTO dto = new BoardDTO();
        dto.setKusID(kusID);               // ✅ 외래키로 쓸 kusID 값
        dto.setBrdTitle(title);
        dto.setBrdContent(content);
        dto.setBrdViews(0);               // ✅ 새 글은 조회수 0으로

        BoardDAO dao = new BoardDAO(conn);
        int result = dao.insertBoard(dto);

        conn.close();

        response.sendRedirect("boardList.do");
        return null;
    }
}
