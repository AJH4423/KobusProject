package koBus.mvc.command;

import java.io.PrintWriter;
import java.sql.Connection;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.util.ConnectionProvider;

import koBus.mvc.domain.RegionDTO;
import koBus.mvc.persistence.RegionDAO;
import koBus.mvc.persistence.RegionDAOImpl;

public class RegionHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("> RegionHandler.process() ...");

        String command = request.getRequestURI();
        command = command.substring(request.getContextPath().length()); 

        String sidoCodeStr = request.getParameter("sidoCode");
        System.out.println(">>> [DAO] sidoCode 파라미터: " + sidoCodeStr);

        try (Connection conn = ConnectionProvider.getConnection()) {
            RegionDAO dao = new RegionDAOImpl();

            if (command.equals("/getTerminals.do") && sidoCodeStr != null) {
                List<RegionDTO> list = null;

                if ("all".equalsIgnoreCase(sidoCodeStr)) {
                    list = dao.selectAll();
                } else {
                    try {
                        int sidoCode = Integer.parseInt(sidoCodeStr);
                        list = dao.selectBySidoCode(sidoCode);
                    } catch (NumberFormatException e) {
                        System.out.println("❌ 잘못된 sidoCode: " + sidoCodeStr);
                        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        return null;
                    }
                }

                // Gson 사용하여 JSON 변환
                Gson gson = new Gson();
                String json = gson.toJson(list);

                response.setContentType("application/json; charset=UTF-8");
                try (PrintWriter out = response.getWriter()) {
                    out.print(json);
                    out.flush();
                }

                return null;
            }

            return "/koBusFile/KOBUSreservation3.jsp";

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
