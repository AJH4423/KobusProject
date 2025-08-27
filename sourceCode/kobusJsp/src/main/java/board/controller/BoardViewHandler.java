package board.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import board.dao.BoardDAO;
import board.dto.BoardDTO;
import koBus.mvc.command.CommandHandler;
import koBus.mvc.persistence.LogonDAOImpl;
import com.util.ConnectionProvider;

import java.sql.Connection;

public class BoardViewHandler implements CommandHandler {
    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {

        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");

        // 1. 세션 및 로그인 ID 확인
        HttpSession session = request.getSession();
        String loginId = (String) session.getAttribute("auth"); // 로그인한 사용자의 id

        // 2. 파라미터로 게시글 ID 받아오기
        String brdIDstr = request.getParameter("brdID");
        int brdID = 0;
        if (brdIDstr != null && !brdIDstr.isEmpty()) {
            brdID = Integer.parseInt(brdIDstr);
        }

        // 3. 게시글 조회
        BoardDAO dao = new BoardDAO();
        BoardDTO dto = dao.getBoard(brdID);
        

        // 4. 조회수 중복 방지 (세션당 1회만 증가)
        if (dto != null) {
            String viewedKey = "viewed_" + brdID;
            if (session.getAttribute(viewedKey) == null) {
                dao.incrementViewCount(brdID);
                session.setAttribute(viewedKey, true);
            }
        }

        // 5. 로그인된 사용자의 kusID 조회
        Connection conn = ConnectionProvider.getConnection();
        LogonDAOImpl logonDAO = new LogonDAOImpl(conn);
        String loginKusID = logonDAO.getKusIDById(loginId);
        conn.close();

        // 6. request 영역에 전달
        request.setAttribute("dto", dto);
        request.setAttribute("loginKusID", loginKusID); // view.jsp에서 비교용

        return "/board/boardView.jsp";
    }
}
