package board.reply;

import board.dao.CommentDAO;
import board.dao.CommentDAOImpl;
import koBus.mvc.command.CommandHandler;

import javax.servlet.http.*;

public class ReplyDeleteHandler implements CommandHandler {

	public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
	    request.setCharacterEncoding("UTF-8");
	    response.setContentType("text/plain; charset=UTF-8");

	    HttpSession session = request.getSession();
	    String kusID = (String) session.getAttribute("auth");

	    if (kusID == null) {
	        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	        response.getWriter().write("unauthorized");
	        return null;
	    }

	    int bcmID = Integer.parseInt(request.getParameter("bcmID"));

	    CommentDAO dao = new CommentDAOImpl();
	    int result = dao.deleteComment(bcmID, kusID);

	    response.getWriter().write(result > 0 ? "success" : "fail");
	    return null; // ✅ 반드시 null 리턴 (뷰 이동 없음)
	}

}
