package koBus.mvc.persistence;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LogonDAOImpl implements LogonDAO {
  
   private Connection conn = null;
   private PreparedStatement pstmt = null;
   private ResultSet rs = null;

   // 생성자 DI
   public LogonDAOImpl(Connection conn) {
      super();
      this.conn = conn;
   }

   public Connection getConn() {
      return conn;
   }

   // setter DI
   public void setConn(Connection conn) {
      this.conn = conn;
   }

   // 회원 아이디, 비밀번호 정보 가져와서 아이디 있으면 1, 없으면 0 넘겨줌
   @Override
   public int logonCheck(String inputId, String inputPasswd) throws SQLException {
       int result = 0;
       
       String sql = "SELECT id FROM kobususer WHERE id = ? AND passwd = ? ";
       String encryptPasswd =  encrypt(inputPasswd);
       System.out.println("암호화된 pw : " + encryptPasswd);
       
       try {
           this.pstmt = conn.prepareStatement(sql);
           this.pstmt.setString(1, inputId.trim());
           this.pstmt.setString(2, encryptPasswd.trim());
           
           this.rs = this.pstmt.executeQuery();
                      
           if (this.rs.next()) {
               result = 1; 
           }   
           System.out.println("result값 : " + result);
          
       } catch(SQLException e){
          e.printStackTrace();
       }finally {
           try { if (this.rs != null) this.rs.close(); } catch (SQLException e) { e.printStackTrace(); }
           try { if (this.pstmt != null) this.pstmt.close(); } catch (SQLException e) { e.printStackTrace(); }
       }
       
       return result;
   }

   // 회원가입할때 아이디 중복확인하는 함수 입력값을 매개변수로 받아서 검색이되면 success, 검색이 안되면 fail을 넘겨줌
   @Override
   public String idDupCheck(String inputId) throws SQLException {
      // 아이디 중복체크~~
      String result = "";

      String sql = "SELECT id FROM kobususer WHERE id = ? ";

      try {
         this.pstmt = conn.prepareStatement(sql);
         this.pstmt.setString(1, inputId.trim());

         this.rs = this.pstmt.executeQuery();

         if (this.rs.next()) {
            result = "success";
         } else {
            result = "fail";
         }
         System.out.println("result값 : " + result);

      } catch (SQLException e) {
         e.printStackTrace();
      } finally {
         try {
            if (this.rs != null)
               this.rs.close();
         } catch (SQLException e) {
            e.printStackTrace();
         }
         try {
            if (this.pstmt != null)
               this.pstmt.close();
         } catch (SQLException e) {
            e.printStackTrace();
         }
      }

      return result;
   }
   
   // 비밀번호 암호화하는 함수
   @Override
   public String encrypt(String inputPasswd) throws SQLException {
      
        try {
               // SHA-256 해시 객체 생성
               MessageDigest md = MessageDigest.getInstance("SHA-256");

               // 입력 문자열을 바이트 배열로 변환 후 해시 수행
               byte[] hashedBytes = md.digest(inputPasswd.getBytes());

               // 바이트 배열을 16진수 문자열로 변환
               StringBuilder sb = new StringBuilder();
               for (byte b : hashedBytes) {
                   sb.append(String.format("%02x", b));  // 2자리 16진수로 포맷팅
               }

               return sb.toString();

           } catch (NoSuchAlgorithmException e) {
               throw new RuntimeException("암호화 알고리즘 에러: " + e.getMessage());
           }
       }

   // 게시판에서 회원 kusID 값 가져와서 게시물 수정 / 삭제 처리 추가 / 최승호
   public String getKusIDById(String id) throws SQLException {
      String sql = "SELECT kusID FROM kobusUser WHERE id = ?";
      try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
         pstmt.setString(1, id);
         ResultSet rs = pstmt.executeQuery();
         if (rs.next()) {
            return rs.getString("kusID");
         }
      }
      return null;
   }


}
