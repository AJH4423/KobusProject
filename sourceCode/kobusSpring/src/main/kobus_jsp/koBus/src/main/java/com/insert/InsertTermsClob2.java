package com.insert;

import java.io.*;
import java.sql.*;

public class InsertTermsClob2 {
    public static void main(String[] args) {
        Connection conn = null;
        PreparedStatement pstmt = null;

        // 1. DB 연결 정보 (본인 환경에 맞게 수정)
        String url = "jdbc:oracle:thin:@localhost:1521:xe";
        String user = "KOBUS";
        String password = "1234";

        // 2. 파일 경로 지정 (Eclipse 프로젝트 외부 경로)
        String filePath = "C:/terms/TransitStplAgrm.html"; // 약관 파일 경로
        int termsId = 2;
        String termsType = "운송";
        String title = "고속버스 운송약관";

        try {
            // 3. Oracle JDBC 드라이버 로딩
            Class.forName("oracle.jdbc.driver.OracleDriver");

            // 4. DB 연결
            conn = DriverManager.getConnection(url, user, password);

            // 5. 파일 → Reader (CLOB)
            Reader reader = new BufferedReader(new FileReader(filePath));

            // 6. SQL 작성 및 바인딩
            String sql = "INSERT INTO TERMS (terms_id, terms_type, title, content) VALUES (?, ?, ?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, termsId);
            pstmt.setString(2, termsType);
            pstmt.setString(3, title);
            pstmt.setClob(4, reader);

            // 7. 실행
            int result = pstmt.executeUpdate();
            System.out.println("삽입 성공: " + result + "건");

            reader.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try { if (pstmt != null) pstmt.close(); } catch (Exception e) {}
            try { if (conn != null) conn.close(); } catch (Exception e) {}
        }
    }
}
