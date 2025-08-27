package koBus.mvc.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import koBus.mvc.domain.TermsDTO;
import koBus.mvc.persistence.TermsDAO;

public class TermsHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String type = request.getParameter("type"); // "서비스" or "운송"
        int termsId = 0;

        if ("서비스".equals(type)) {
            termsId = 1;
        } else if ("운송".equals(type)) {
            termsId = 2;
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "약관 유형이 올바르지 않습니다.");
            return null;
        }

        TermsDAO dao = new TermsDAO();
        TermsDTO dto = dao.selectById(termsId);

        request.setAttribute("terms", dto);
        return "/WEB-INF/views/termsView.jsp";
    }
}