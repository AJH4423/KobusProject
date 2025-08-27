package koBus.mvc.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SetPcpyHandler implements CommandHandler {
    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 1. 파라미터 받기 (예시)
        String deprCd = request.getParameter("deprCd");
        String seatNum = request.getParameter("seatNum");
        // ... 기타 필요한 데이터

        // 2. 좌석 정보 임시 저장 or 검증 로직
        //   예: DB 저장, 세션 저장, 중복 확인 등
        boolean success = true; // 예시로 성공 처리

        // 3. 응답으로 JSON 내려주기
        response.setContentType("application/json;charset=UTF-8");
        String json = "{\"result\": \"" + (success ? "success" : "fail") + "\"}";
        response.getWriter().write(json);

        // 4. 페이지 이동(포워드) 없이 null 반환
        return null;
    }
}
