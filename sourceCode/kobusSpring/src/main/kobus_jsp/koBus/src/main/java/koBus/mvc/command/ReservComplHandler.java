package koBus.mvc.command;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ReservComplHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {

        // 1. 파라미터 수집
        String resId = request.getParameter("resId");
        String deprDtRaw = request.getParameter("deprDt");   // "20250626"
        String deprTime = request.getParameter("deprTime");  // "072000"

        String deprNm = request.getParameter("deprNm");
        String arvlNm = request.getParameter("arvlNm");
        String takeDrtmOrg = request.getParameter("takeDrtmOrg");  // "120"

        String cacmNm = request.getParameter("cacmNm");
        String indVBusClsCd = request.getParameter("indVBusClsCd");
        String selSeatCnt = request.getParameter("selSeatCnt");
        String seatNos = request.getParameter("seatNos");

        String selAdltCnt = request.getParameter("selAdltCnt");
        String selTeenCnt = request.getParameter("selTeenCnt");
        String selChldCnt = request.getParameter("selChldCnt");

        String payMethod = request.getParameter("payMethod");
        String amountStr = request.getParameter("amount");

        // 2. 날짜/시간 포맷 처리
        String deprDtFmt = "";
        String deprTimeFmt = "";
        String fullDeprDateTime = "";

        try {
            Date deprDate = new SimpleDateFormat("yyyyMMdd").parse(deprDtRaw);
            deprDtFmt = new SimpleDateFormat("yyyy.MM.dd (E)", Locale.KOREA).format(deprDate);
        } catch (Exception e) {
            deprDtFmt = "날짜오류";
        }

        if (deprTime != null && deprTime.length() >= 4) {
            deprTimeFmt = deprTime.substring(0, 2) + ":" + deprTime.substring(2, 4);
        }

        fullDeprDateTime = deprDtFmt + " " + deprTimeFmt;

        // 3. 소요시간 포맷 (분 → 시/분)
        String durationStr = "";
        try {
            int durationMin = Integer.parseInt(takeDrtmOrg);
            int hours = durationMin / 60;
            int minutes = durationMin % 60;
            durationStr = (hours > 0 ? hours + "시간 " : "") + minutes + "분";
        } catch (Exception e) {
            durationStr = "소요시간 오류";
        }

        // 4. 결제일시 포맷
        String paidAtStr = new SimpleDateFormat("yyyy.MM.dd (E) HH:mm", Locale.KOREA).format(new Date());

        // 5. 탑승객 요약
        int adlt = Integer.parseInt(selAdltCnt == null ? "0" : selAdltCnt);
        int teen = Integer.parseInt(selTeenCnt == null ? "0" : selTeenCnt);
        int chld = Integer.parseInt(selChldCnt == null ? "0" : selChldCnt);

        String buyerSummary = (adlt > 0 ? "일반 " + adlt + "명 " : "") +
                              (teen > 0 ? "청소년 " + teen + "명 " : "") +
                              (chld > 0 ? "어린이 " + chld + "명" : "");

        // 6. request에 값 담기
        request.setAttribute("resId", resId);
        request.setAttribute("deprNm", deprNm);
        request.setAttribute("arvlNm", arvlNm);
        request.setAttribute("takeDrtmOrg", takeDrtmOrg);
        request.setAttribute("durationStr", durationStr);

        request.setAttribute("cacmNm", cacmNm);
        request.setAttribute("indVBusClsCd", indVBusClsCd);
        request.setAttribute("selSeatCnt", selSeatCnt);
        request.setAttribute("seatNos", seatNos);
        request.setAttribute("payMethod", payMethod);
        request.setAttribute("amount", amountStr);

        request.setAttribute("deprDtTimeFmt", fullDeprDateTime);
        request.setAttribute("paidAtStr", paidAtStr);
        request.setAttribute("buyerSummary", buyerSummary.trim());

        return "/koBusFile/reservCompl.jsp";
    }
}
