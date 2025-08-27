package koBus.mvc.command;

import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;


public class PassVldTermHandler implements CommandHandler {
    @Override
    public String process(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        // 1. 파라미터 받기
        String startDate = req.getParameter("startDate"); // 예: 20250620
        String periodStr = req.getParameter("period");    // 예: 5
        
        if (startDate == null || periodStr == null || startDate.trim().isEmpty() || periodStr.trim().isEmpty()) {
            System.out.println("[Warn] 파라미터 누락! (startDate, period) -> startDate: [" + startDate + "], period: [" + periodStr + "]");
            JSONObject result = new JSONObject();
            result.put("fulTerm", "");
            result.put("rotAllCnt", 0);
            result.put("termSttDt", "");
            resp.setContentType("application/json; charset=UTF-8");
            PrintWriter out = resp.getWriter();
            out.write(result.toString());
            out.close();
            return null;
        }
        
        System.out.println("startDate: [" + startDate + "], period: [" + periodStr + "]");

        JSONObject result = new JSONObject();

        try {
            startDate = startDate.trim();
            periodStr = periodStr.trim();
            // 2. 날짜 계산
            LocalDate stt = LocalDate.parse(startDate, DateTimeFormatter.ofPattern("yyyyMMdd"));
            int period = Integer.parseInt(periodStr);

            // 3. 종료일 = 시작일 + (기간-1)
            LocalDate end = stt.plusDays(period - 1);

            // 4. 출력형태: 2025.06.20 ~ 2025.06.24
            String fulTerm = stt.format(DateTimeFormatter.ofPattern("yyyy.MM.dd")) +
                             " ~ " +
                             end.format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
            
            String termSttDt = stt.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            // int pubAmt = 10000 * period;

            result.put("fulTerm", fulTerm);
            // (필요하면 기타값 추가)
            result.put("rotAllCnt", 1); // 정상응답 표식 등, 프론트에서 rotAllCnt 체크함
            result.put("termSttDt", termSttDt);
            result.put("timDte", termSttDt);
            // result.put("pubAmt", pubAmt);
        } catch (Exception e) {
        	e.printStackTrace();
        	System.out.println("startDate: [" + startDate + "], period: [" + periodStr + "]");
            result.put("fulTerm", "");
            result.put("rotAllCnt", 0);
            
        }

        resp.setContentType("application/json; charset=UTF-8");
        PrintWriter out = resp.getWriter();
        out.write(result.toString());
        out.close();

        return null; // view 이동 없음(ajax json 응답)
    }
}