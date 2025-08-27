package lossCenter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import koBus.mvc.command.CommandHandler;

public class LostDongbuHandler implements CommandHandler {
    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "/lossCenter/lostDongbu.jsp";
    }
}
