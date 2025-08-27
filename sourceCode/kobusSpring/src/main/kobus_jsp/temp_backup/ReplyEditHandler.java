package board.reply;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import board.dao.CommentDAO;
import board.dao.CommentDAOImpl;
import board.dto.CommentDTO;
import koBus.mvc.command.CommandHandler;

public class ReplyEditHandler implements CommandHandler {

     @Override
     public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
             // 인코딩 처리
             request.setCharacterEncoding("UTF-8");
             response.setContentType("text/plain; charset=UTF-8");

             // 세션에서 로그인한 사용자 ID 가져오기
             HttpSession session = request.getSession();
             String kusID = (String) session.getAttribute("auth");

             if (kusID == null) {
                     response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
                     response.getWriter().write("unauthorized");
                     return null;
             }

             try {
                     // 파라미터 수집
                     int bcmID = Integer.parseInt(request.getParameter("bcmID"));
                     String content = request.getParameter("content");

                     // DTO 생성
                     CommentDTO dto = new CommentDTO();
                     dto.setBcmID(bcmID);
                     dto.setContent(content);
                     dto.setKusID(kusID); // 세션에서 받은 사용자 ID

                     // DAO 호출
                     CommentDAO dao = new CommentDAOImpl();
                     int result = dao.updateComment(dto);

                     if (result > 0) {
                             response.getWriter().write("success");
                     } else {
                             response.getWriter().write("fail"); // 권한 없음이거나 존재하지 않는 댓글
                     }

             } catch (Exception e) {
                     e.printStackTrace();
                     response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500
                     response.getWriter().write("error");
             }

             return null; // AJAX 요청에 대해 별도 뷰 없음
     }

}