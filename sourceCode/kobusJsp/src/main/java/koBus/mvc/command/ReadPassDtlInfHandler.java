package koBus.mvc.command;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import koBus.mvc.domain.PurchaseOptionDTO;
import koBus.mvc.persistence.PurchaseOptionDAO;

public class ReadPassDtlInfHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	System.out.println("✅ [ReadPassDtlInfHandler] 핸들러 진입");
    	
        PurchaseOptionDAO dao = new PurchaseOptionDAO();
        List<PurchaseOptionDTO> list = dao.getAllOptions();
        
        System.out.println("📦 구매옵션 개수: " + list.size());

        JSONObject result = new JSONObject();
        JSONArray optionList = new JSONArray();

        for (PurchaseOptionDTO dto : list) {
            JSONObject obj = new JSONObject();

            // 응답으로 내려주는 데이터 형식
            obj.put("adtnPrdUseClsCd", dto.getUseClsCd());
            obj.put("wkdWkeNtknCd", dto.getBusGradeCd());
            obj.put("adtnPrdUseNtknCd", dto.getPeriodCd());
            obj.put("adtnPrdUsePsbDno", dto.getUseDays());
            obj.put("adtnPrdUseClsNm", dto.getUseClsNm());
            obj.put("adtnPrdUseNtknNm", dto.getPeriodNm());
            obj.put("wkdWkeNtknNm", dto.getBusGradeNm());
            obj.put("adtnPrdSno", dto.getOptionId());
            
         // ✅ 여기에 금액 계산 추가
            int basePricePerDay = 10000;
            int discountPricePerDay = 9000;
            int days = Integer.parseInt(dto.getUseDays());
            int price;

            // ✅ 등급명이 전체등급이면 할인 적용
            if ("전체등급(프리미엄 제외)".equals(dto.getUseClsNm().trim())) {
                price = discountPricePerDay * days;
            } else {
                price = basePricePerDay * days;
            }

            obj.put("pubAmt", price);
            
            optionList.put(obj);

        }

        result.put("adtnDtlList", optionList);
        result.put("len", list.size());
        
        System.out.println("📤 응답 JSON: " + result.toString());

        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write(result.toString());

        return null; // JSP 이동 없이 JSON만 응답
    }
}
