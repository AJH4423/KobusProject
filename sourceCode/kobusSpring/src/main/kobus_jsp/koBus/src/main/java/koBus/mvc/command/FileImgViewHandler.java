package koBus.mvc.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FileImgViewHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) {
        // /WEB-INF/views/html/fileImgView.jsp 파일로 포워딩
        return "/WEB-INF/views/html/fileImgView.jsp";
    }
}
