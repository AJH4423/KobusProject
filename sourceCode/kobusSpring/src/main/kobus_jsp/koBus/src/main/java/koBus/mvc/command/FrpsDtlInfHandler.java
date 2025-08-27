package koBus.mvc.command;

import java.io.PrintWriter;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import koBus.mvc.domain.FreePassOptionDTO;
import koBus.mvc.persistence.FreePassOptionDAO;
import org.json.JSONArray;
import org.json.JSONObject;

public class FrpsDtlInfHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        FreePassOptionDAO dao = new FreePassOptionDAO();
        List<FreePassOptionDTO> list = dao.selectAllOptions();

        JSONObject result = new JSONObject();
        JSONArray jsonList = new JSONArray();
        System.out.println("== 옵션 개수: " + list.size());

        for (FreePassOptionDTO dto : list) {
        	System.out.println("== 옵션: " + dto.getAdtnPrdUseNtknNm());
            JSONObject obj = new JSONObject();
            obj.put("adtnPrdSno", dto.getAdtnPrdSno());
            obj.put("adtnPrdUseClsCd", dto.getAdtnPrdUseClsCd());
            obj.put("adtnPrdUseClsNm", dto.getAdtnPrdUseClsNm());
            obj.put("adtnPrdUsePsbDno", dto.getAdtnPrdUsePsbDno());
            obj.put("adtnPrdUseNtknCd", dto.getAdtnPrdUseNtknCd());
            obj.put("adtnPrdUseNtknNm", dto.getAdtnPrdUseNtknNm());
            obj.put("wkdWkeNtknCd", dto.getWkdWkeNtknCd());
            obj.put("wkdWkeNtknNm", dto.getWkdWkeNtknNm());
            obj.put("tempAlcnTissuPsbYn", dto.getTempAlcnTissuPsbYn());
            obj.put("adtnDcYn", dto.getAdtnDcYn());
            jsonList.put(obj);
        }

        result.put("adtnDtlList", jsonList);
        result.put("len", list.size());

        response.setContentType("application/json; charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.print(result.toString());
        out.flush();

        return null;  // AJAX 응답만 하고 JSP로 이동하지 않음
    }
}
