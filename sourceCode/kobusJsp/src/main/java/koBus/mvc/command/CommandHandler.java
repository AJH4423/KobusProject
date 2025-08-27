package koBus.mvc.command;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface CommandHandler {

    String process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException, Exception, Throwable;

}
