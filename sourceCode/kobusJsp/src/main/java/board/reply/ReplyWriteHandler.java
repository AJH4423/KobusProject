package board.reply;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import board.dao.CommentDAO;
import board.dao.CommentDAOImpl;
import board.dto.CommentDTO;
import koBus.mvc.command.CommandHandler;

public class ReplyWriteHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/plain; charset=UTF-8");

        // ✅ 로그인된 사용자 ID 가져오기 (auth 세션값)
        HttpSession session = request.getSession();
        String kusID = (String) session.getAttribute("auth");

        if (kusID == null) {
            response.getWriter().write("nologin");
            return null;
        }

        String content = request.getParameter("content");
        String brdIDParam = request.getParameter("brdID");

        if (content == null || brdIDParam == null) {
            response.getWriter().write("fail");
            return null;
        }

        try {
            int brdID = Integer.parseInt(brdIDParam);

            CommentDTO dto = new CommentDTO();
            dto.setBrdID(brdID);
            dto.setKusID(kusID);
            dto.setContent(content);

            CommentDAO dao = new CommentDAOImpl();
            dao.insertComment(dto);

            response.getWriter().write("success");
        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().write("fail");
        }

        return null;
    }
}
