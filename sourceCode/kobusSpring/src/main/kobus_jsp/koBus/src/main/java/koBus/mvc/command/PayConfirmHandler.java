package koBus.mvc.command;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.util.DBConn;

public class PayConfirmHandler implements CommandHandler {

    @Override
    public String process(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        // 1. 요청 파라미터 받기(정기권)
        String prdSno = req.getParameter("adtnPrdSno");
        String inputAmt = req.getParameter("goodsPrice");

        System.out.println("[PayConfirmHandler] 상품ID: " + prdSno);
        System.out.println("[PayConfirmHandler] 클라이언트 금액: " + inputAmt);

        // 2. 실제 금액 계산 로직 (DB 또는 서버 기준 가격 조회)
        int serverAmt = getPriceFromDB(prdSno);

        // 3. 금액 검증
        boolean isValid = false;
        try {
            int clientAmt = Integer.parseInt(inputAmt);
            isValid = (clientAmt == serverAmt);
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }

        // 4. JSON 응답
        JSONObject result = new JSONObject();
        result.put("status", isValid ? "success" : "fail");
        result.put("serverAmt", serverAmt);

        resp.setContentType("application/json; charset=UTF-8");
        PrintWriter out = resp.getWriter();
        out.write(result.toString());
        out.close();

        return null;
    }

 // ✅ 실제 DB에서 가격 조회
    private int getPriceFromDB(String prdSno) {
        int price = 0;

        String sql = "SELECT PRICE FROM PASS_DETAIL WHERE ADTN_PRD_SNO = ?";

        try (Connection conn = DBConn.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, prdSno);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    price = rs.getInt("PRICE");
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return price;
    }
}

