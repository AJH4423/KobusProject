package board.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import koBus.mvc.command.CommandHandler;

public class FaqHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 필요 시 FAQ 관련 DB 조회 또는 고정 데이터 세팅 가능
        return "/html/go_bus_faq.jsp";  // 실제로 JSP로 forward
    }
}
