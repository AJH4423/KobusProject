package board.reply;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import board.dao.CommentDAO;
import board.dao.CommentDAOImpl;
import board.dto.CommentDTO;
import koBus.mvc.command.CommandHandler;

public class ReplyListHandler implements CommandHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
		int brdID = Integer.parseInt(request.getParameter("brdID"));

		CommentDAO dao = new CommentDAOImpl();
		List<CommentDTO> commentList = dao.getCommentsByBrdID(brdID);

		request.setAttribute("commentList", commentList);
		return "/board_reply/replyList.jsp";
	}
}
