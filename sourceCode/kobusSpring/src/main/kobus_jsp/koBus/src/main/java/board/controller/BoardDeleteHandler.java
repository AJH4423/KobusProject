package board.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.util.ConnectionProvider;
import koBus.mvc.command.CommandHandler;
import koBus.mvc.persistence.LogonDAO;
import koBus.mvc.persistence.LogonDAOImpl;

public class BoardDeleteHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        HttpSession session = request.getSession();
        String id = (String) session.getAttribute("auth"); // 로그인한 사용자 ID (예: user1)

        if (id == null) {
            response.sendRedirect(request.getContextPath() + "/page/logonMain.do");
            return null;
        }

        int brdID = Integer.parseInt(request.getParameter("brdID"));

        Connection conn = ConnectionProvider.getConnection();
        LogonDAO logonDAO = new LogonDAOImpl(conn);
        String kusID = logonDAO.getKusIDById(id); // 로그인 사용자의 kusID 가져옴

        // 1. 해당 게시글 작성자 확인
        String sql = "SELECT kusID FROM board WHERE brdID = ?";
        String writerKusID = null;

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, brdID);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                writerKusID = rs.getString("kusID");
            }
        }

        if (writerKusID == null || !writerKusID.equals(kusID)) {
            System.out.println("삭제 권한 없음. 로그인: " + kusID + ", 작성자: " + writerKusID);
            conn.close();
            response.sendRedirect(request.getContextPath() + "/html/boardList.do");
            return null;
        }

        // 2. 삭제 수행
        String deleteSql = "DELETE FROM board WHERE brdID = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(deleteSql)) {
            pstmt.setInt(1, brdID);
            pstmt.executeUpdate();
        }

        conn.close();
        response.sendRedirect(request.getContextPath() + "/html/boardList.do");
        return null;
    }
}
