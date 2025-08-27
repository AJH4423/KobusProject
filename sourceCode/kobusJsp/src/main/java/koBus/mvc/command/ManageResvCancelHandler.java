package koBus.mvc.command;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.util.ConnectionProvider;

import koBus.mvc.persistence.ResvDAO;
import koBus.mvc.persistence.ResvDAOImpl;

public class ManageResvCancelHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String ajax = request.getParameter("ajax");
        int cancelResult = 0;
        Map<String, Object> recpListMap = new HashMap<>();
        
        System.out.println("11111 ajax " + ajax);
        

        if ("true".equalsIgnoreCase(ajax)) {
            try (Connection conn = ConnectionProvider.getConnection()) {

            	String mrsMrnpNo = request.getParameter("mrsMrnpno");
            	
            	System.out.println("mrsMrnpNo " + mrsMrnpNo);

                // DAO 호출
                ResvDAO dao = new ResvDAOImpl(conn);
                cancelResult = dao.cancelResvList(mrsMrnpNo);
                
                System.out.println(cancelResult);

                // 처리 결과 및 필요한 값 저장
                recpListMap.put("cancelResult", cancelResult);
                recpListMap.put("mrsMrnpNo", mrsMrnpNo);

                // 추가로 클라이언트에 전달할 데이터가 있다면 put() 하세요.

            } catch (Exception e) {
                recpListMap.put("error", "오류 발생: " + e.getMessage());
            }

            response.setContentType("application/json;charset=UTF-8");
            try (PrintWriter out = response.getWriter()) {
                String json = new Gson().toJson(recpListMap);
                out.write(json);
                out.flush();
            }

            // ajax 요청은 JSP 페이지 이동 없이 종료
            return null;
        }

        // ajax가 아닌 경우 기본 페이지로 이동
        request.setAttribute("cancelResult", cancelResult);
        return "/koBusFile/kobusManageResv.jsp";
    }
}
