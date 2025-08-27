package koBus.mvc.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MainHandler implements CommandHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response) {
		
		// [2] DB 처리 
		System.out.println("> MainHandler.process() ...");
		
		return "/koBusFile/kobus_main.jsp";
	}
	
}
