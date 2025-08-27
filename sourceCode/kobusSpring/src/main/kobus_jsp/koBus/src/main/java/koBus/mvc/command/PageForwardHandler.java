package koBus.mvc.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PageForwardHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String page = request.getParameter("page");

        if ("freePass".equals(page)) {
            return "/koBusFile/freePass.jsp";
        } else if ("seasonTicket".equals(page)) {
            return "/koBusFile/seasonTicket.jsp";
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }
    }
}
