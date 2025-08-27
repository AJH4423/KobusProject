package koBus.mvc.command;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import koBus.mvc.domain.AdtnPrdDTO;
import koBus.mvc.domain.TimDteDTO;
import koBus.mvc.persistence.AdtnPrdDAO;

public class AdtnPrdValNewHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 1. 폼 파라미터 수집 (필요에 따라)
        String userId = request.getParameter("userId");  // 예시
        // TODO: 필요한 값들 request.getParameter로 추출

        // 2. DAO 호출
        AdtnPrdDAO dao = new AdtnPrdDAO();
        List<AdtnPrdDTO> adntPrdList = dao.getAvailablePrdList(userId); // 정기권 & 프리패스
        List<TimDteDTO> adntTimDteList = dao.getTimetableList(); // 프리패스 사용 가능일자

        // 3. JSON 응답 구성
        JSONObject result = new JSONObject();
        result.put("prdListCnt", adntPrdList.size());

        JSONArray prdArray = new JSONArray();
        for (AdtnPrdDTO dto : adntPrdList) {
            JSONObject obj = new JSONObject();
            obj.put("ADTN_CPN_NO", dto.getAdtnCpnNo());
            obj.put("ADTN_PRD_KND_CD", dto.getAdtnPrdKndCd());
            obj.put("ADTN_PRD_USE_PSB_DNO", dto.getAdtnPrdUsePsbDno());
            obj.put("wkdWkeNtknNm", dto.getWkdWkeNtknNm());
            obj.put("adtnPrdUseClsNm", dto.getAdtnPrdUseClsNm());
            obj.put("EXDT_STT_DT", dto.getExdtSttDt());
            obj.put("EXDT_END_DT", dto.getExdtEndDt());
            obj.put("adtnPrdUseNtknNm", dto.getAdtnPrdUseNtknNm());
            obj.put("PUB_USER_NO", dto.getPubUserNo());
            prdArray.put(obj);
        }
        result.put("adntPrdList", prdArray);

        JSONArray timArray = new JSONArray();
        for (TimDteDTO dto : adntTimDteList) {
            JSONObject obj = new JSONObject();
            obj.put("FP_CPN_NO", dto.getFpCpnNo());
            obj.put("TIM_DTE", dto.getTimDte());
            timArray.put(obj);
        }
        result.put("adntTimDteList", timArray);
        result.put("timDteListCnt", timArray.length());

        // 정상 메시지 코드
        result.put("MSG_CD", "S0000");

        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write(result.toString());

        return null; // AJAX는 view로 forward하지 않음
    }
}
