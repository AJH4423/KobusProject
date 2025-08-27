package koBus.mvc.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

public class FrpsVldTermHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) {
        try {
            response.setContentType("application/json; charset=UTF-8");
            PrintWriter out = response.getWriter();

            // 1. 파라미터 받기
            String selOption = request.getParameter("selOption"); // 예: 1/3/2/4/Y/0027
            String startDate = request.getParameter("startDate"); // 예: 20250619
            String periodStr = request.getParameter("period");    // 예: 4

            System.out.println("---- FrpsVldTermHandler 호출 ----");
            System.out.println("selOption = " + selOption);
            System.out.println("startDate = " + startDate);
            System.out.println("periodStr = " + periodStr);

            JSONObject result = new JSONObject();

            // 2. 유효성 체크
            if (selOption == null || startDate == null || periodStr == null) {
                result.put("rcvMsgNm", "선택 옵션, 시작일 또는 기간이 없습니다.");
                result.put("rotAllCnt", 0);
                out.print(result.toString());
                return null;
            }

            // 3. 옵션값에서 주중권/전일권 구분
            String passTypeCd = null;
            String[] parts = selOption.split("/");
            if (parts.length > 0) {
                passTypeCd = parts[0]; // ★ 첫번째 값이 기준!
            }
            boolean isWeekdayOnly = "2".equals(passTypeCd); // 2면 주중권, 1이면 전일권

            int periodDays = Integer.parseInt(periodStr);

            // 4. 사용 가능 날짜 리스트 생성
            List<String> validDateList = getValidDates(startDate, periodDays, isWeekdayOnly);

            if (validDateList.isEmpty()) {
                result.put("rcvMsgNm", "기간 계산 결과가 없습니다.");
                result.put("rotAllCnt", 0);
                out.print(result.toString());
                return null;
            }

            // 5. 종료일, 전체 기간 string 생성
            String endDate = validDateList.get(validDateList.size() - 1).replace(".", "");
            String fulTerm = String.join("/", validDateList);

            System.out.println("최종 result = " + validDateList);
            
            String adtnPrdSno = parts[parts.length - 1];
            System.out.println("프론트에서 받은 옵션 PK(adtn_prd_sno) = " + adtnPrdSno);
            // 금액 조회
            int pubAmt = 0;
            try {
                koBus.mvc.persistence.FreePassOptionDAO dao = new koBus.mvc.persistence.FreePassOptionDAO();
                pubAmt = dao.getAmountBySno(adtnPrdSno); // DAO 메서드 호출
            } catch (Exception e) {
                e.printStackTrace();
                pubAmt = 0;
            }

            // 6. JSON 응답 구성
            result.put("termSttDt", startDate);
            result.put("timDte", endDate);
            result.put("fulTerm", fulTerm);

            result.put("pubAmt", pubAmt);
            result.put("rotAllCnt", 1);
            result.put("adtnDupPrchYn", "N");

            out.print(result.toString());

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * 사용 가능한 날짜 리스트 반환 + **모든 과정 로그 추가**
     */
    private List<String> getValidDates(String startDateStr, int period, boolean isWeekdayOnly) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat sdfOut = new SimpleDateFormat("yyyy.MM.dd");
        SimpleDateFormat sdfDay = new SimpleDateFormat("dd");
        Date startDate = sdf.parse(startDateStr);
        Calendar cal = Calendar.getInstance();
        cal.setTime(startDate);

        System.out.println("---- getValidDates 호출 ----");
        System.out.println("startDate = " + startDateStr + " (" + sdfOut.format(cal.getTime()) + ")");
        System.out.println("isWeekdayOnly = " + isWeekdayOnly);
        System.out.println("period = " + period);

        List<String> result = new ArrayList<>();
        int count = 0;
        int loop = 1;
        while (count < period) {
            int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK); // 일=1, 월=2, ..., 목=5, 금=6, 토=7

            // 요일 한글 표시(디버깅에 도움)
            String[] dayKor = {"일", "월", "화", "수", "목", "금", "토"};
            String weekName = dayKor[dayOfWeek-1];

            System.out.println("loop #" + loop + " : " + sdfOut.format(cal.getTime()) + " (" + weekName + ", 요일: " + dayOfWeek + ")");
            loop++;

            if (isWeekdayOnly) {
                // 월(2)~목(5)만 평일로 인정
                if (dayOfWeek >= Calendar.MONDAY && dayOfWeek <= Calendar.THURSDAY) {
                    if (count == 0) {
                        result.add("<span class='term-highlight'>" + sdfOut.format(cal.getTime()) + "</span>");
                    } else {
                        result.add("<span class='term-highlight'>" + sdfDay.format(cal.getTime()) + "</span>");
                    }
                    System.out.println("   → 평일(월~목)로 카운트됨! count=" + (count+1));
                    count++;
                } else {
                    System.out.println("   → 주말(금/토/일) SKIP");
                }
            } else {
                if (count == 0) {
                    result.add("<span class='term-highlight'>" + sdfOut.format(cal.getTime()) + "</span>");
                } else {
                    result.add("<span class='term-highlight'>" + sdfDay.format(cal.getTime()) + "</span>");
                }
                System.out.println("   → 연속권이므로 카운트! count=" + (count+1));
                count++;
            }
            cal.add(Calendar.DATE, 1);
        }
        return result;
    }
}
