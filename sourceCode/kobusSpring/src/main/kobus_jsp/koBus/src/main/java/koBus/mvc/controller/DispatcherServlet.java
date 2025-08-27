package koBus.mvc.controller;

import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import koBus.mvc.command.CommandHandler;


public class DispatcherServlet extends HttpServlet {


	private static final long serialVersionUID = 1L;

	@Override
	public void destroy() {
		super.destroy();
	}
	
	
	   public Map<String, CommandHandler> commandHandlerMap = new HashMap<>();

	@Override
	public void init() throws ServletException {
		super.init();
		System.out.println("> DispatcherServlet.init()...");
		String mappingPath = this.getInitParameter("mappingPath");
		String realPath = this.getServletContext().getRealPath(mappingPath);
		System.out.println("> realPath : " + realPath);
		

		
		Properties prop = new Properties();
		try(FileReader reader = new FileReader(realPath)) {
			prop.load(reader);
		} catch (Exception e) {
			throw new ServletException();
		}
		
		Set<Entry<Object, Object>> set = prop.entrySet();
		Iterator<Entry<Object, Object>> ir = set.iterator();
		while (ir.hasNext()) {
			Entry<Object, Object> entry = ir.next();
			String url = (String) entry.getKey();
			String fullName = (String) entry.getValue();
			

			Class<?> commandHandlerClass = null;
			
			try {
				commandHandlerClass = Class.forName(fullName);
				try {
					CommandHandler handler = (CommandHandler) commandHandlerClass.newInstance();
					this.commandHandlerMap.put(url, handler);
				} catch (InstantiationException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				}
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
			
		}
		
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	    resp.setContentType("text/html; charset=UTF-8");
	    resp.setCharacterEncoding("UTF-8");

	    String requestURI = req.getRequestURI();
	    int beginIndex = req.getContextPath().length();
	    requestURI = requestURI.substring(beginIndex);
	    System.out.println("실제 요청 URI: " + requestURI);

	    CommandHandler handler = this.commandHandlerMap.get(requestURI);
	    System.out.println("핸들러 매핑 결과: " + handler);

	    if (handler == null) {
	        resp.sendError(HttpServletResponse.SC_NOT_FOUND);
	        return;
	    }

	    try {
	        String view = handler.process(req, resp);

	        // AJAX 응답 처리: "ajax:"로 시작할 경우 바로 출력
	        if (view != null && view.startsWith("ajax:")) {
	            String ajaxResult = view.substring(5);  // "ajax:success" → "success"
	            resp.setContentType("text/plain; charset=UTF-8");
	            resp.getWriter().write(ajaxResult);
	            return;
	        }

	        // 일반 JSP 포워드 처리
	        if (view != null) {
	            RequestDispatcher dispatcher = req.getRequestDispatcher(view);
	            dispatcher.forward(req, resp);
	        }

	    } catch (Throwable e) {
	        e.printStackTrace();
	        resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	    }
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req, resp);
	}

	

}

