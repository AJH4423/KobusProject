package koBus.mvc.command;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import koBus.mvc.domain.RouteLineDTO;
import koBus.mvc.persistence.RouteLineDAO;

public class ReadPassRotLinInfHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        RouteLineDAO dao = new RouteLineDAO();
        List<RouteLineDTO> list = dao.getAllRoutes();

        JSONObject result = new JSONObject();
        JSONArray rotList = new JSONArray();

        for (RouteLineDTO dto : list) {
            JSONObject obj = new JSONObject();
            obj.put("adtnDeprNm", dto.getStartName());
            obj.put("adtnArvlNm", dto.getEndName());
            obj.put("adtnDeprCd", dto.getRouteId().substring(0, 3));
            obj.put("adtnArvlCd", dto.getRouteId().substring(3, 6));
            obj.put("deprNm", dto.getStartName());
            obj.put("arvlNm", dto.getEndName());
            obj.put("adtnPrdSellSttDt", dto.getSellStartDate());
            rotList.put(obj);
        }

        result.put("adtnRotInfList", rotList);
        result.put("len", list.size());

        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write(result.toString());
        
        return null;

    }
}