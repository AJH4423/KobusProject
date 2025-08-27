package koBus.mvc.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import koBus.mvc.persistence.FreePassOptionDAO; // DAO는 아래에서 예시
import java.io.PrintWriter;

public class FrpsAmountFetchHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String adtnPrdSno = request.getParameter("adtn_prd_sno");
        
        // DB에서 옵션 금액 가져오기
        FreePassOptionDAO dao = new FreePassOptionDAO();
        int amount = dao.getAmountBySno(adtnPrdSno);

        response.setContentType("application/json; charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.write("{\"amount\":" + amount + "}");
        out.close();
        return null; // AJAX라서 return view 없음
    }
}
