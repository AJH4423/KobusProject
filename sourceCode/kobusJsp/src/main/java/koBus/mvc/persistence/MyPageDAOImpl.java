package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class MyPageDAOImpl implements MyPageDAO {

	private Connection conn = null;
	private PreparedStatement pstmt = null;
	private ResultSet rs = null;
	
	// 생성자 DI
	public MyPageDAOImpl(Connection conn) {
		super();
		this.conn = conn;
	}
	
	// 예매내역 개수 가져오기
	@Override
	public int reservationCount(String auth) throws SQLException {
		int reservationCount = 0;
		
		String sql = "SELECT COUNT(*) AS reservation_count "
				+ "FROM reservation r "
				+ "JOIN kobusUser u ON r.kusID = u.kusID "
				+ "WHERE u.id = ? ";
		
		try {
	        this.pstmt = conn.prepareStatement(sql);
	        this.pstmt.setString(1, auth.trim());
	        
	        this.rs = this.pstmt.executeQuery();
	        	        
	        if (this.rs.next()) {
	        	reservationCount = rs.getInt("reservation_count"); 
	        }	
	        System.out.println("예매갯수 : " + reservationCount);
	       
	    } catch(SQLException e){
	    	e.printStackTrace();
	    }finally {
	        try { if (this.rs != null) this.rs.close(); } catch (SQLException e) { e.printStackTrace(); }
	        try { if (this.pstmt != null) this.pstmt.close(); } catch (SQLException e) { e.printStackTrace(); }
	    }
		
		return reservationCount;
	}
	
	// 휴대폰번호 가져오는 함수
	@Override
	public String getTelNum(String auth) throws SQLException {
		String tel = "";
		
		String sql = "SELECT tel "
				+ "FROM kobusUser "
				+ "WHERE id = ? ";
		
		try {
	        this.pstmt = conn.prepareStatement(sql);
	        this.pstmt.setString(1, auth.trim());
	        
	        this.rs = this.pstmt.executeQuery();
	        	        
	        if (this.rs.next()) {
	        	tel = rs.getString("tel"); 
	        }	
	        System.out.println("전화번호 : " + tel);
	       
	    } catch(SQLException e){
	    	e.printStackTrace();
	    }finally {
	        try { if (this.rs != null) this.rs.close(); } catch (SQLException e) { e.printStackTrace(); }
	        try { if (this.pstmt != null) this.pstmt.close(); } catch (SQLException e) { e.printStackTrace(); }
	    }
		
		return tel;
	}
	
	// 전화번호 가져오는 함수
	@Override
	public String getOldPw(String auth) throws SQLException {
		String oldPw = "";
		
		String sql = "SELECT passwd "
				+ "FROM kobusUser "
				+ "WHERE id = ? ";
		
		try {
	        this.pstmt = conn.prepareStatement(sql);
	        this.pstmt.setString(1, auth.trim());
	        
	        this.rs = this.pstmt.executeQuery();
	        	        
	        if (this.rs.next()) {
	        	oldPw = rs.getString("passwd"); 
	        }	
	        System.out.println("현재 비밀번호 : " + oldPw);
	       
	    } catch(SQLException e){
	    	e.printStackTrace();
	    }finally {
	        try { if (this.rs != null) this.rs.close(); } catch (SQLException e) { e.printStackTrace(); }
	        try { if (this.pstmt != null) this.pstmt.close(); } catch (SQLException e) { e.printStackTrace(); }
	    }
		
		return oldPw;
	}
	
	// id값이랑 바꿀값 넣어서 회원 db 테이블 update하는 함수
	@Override
	public int updatePw(String auth, String changePw) throws SQLException {
		
		int result = 0;
		
		String sql= "UPDATE kobusUser "
				+ "SET passwd = ? "
				+ "WHERE id = ? ";
		
		try {
			
			this.pstmt = conn.prepareStatement(sql);
	        this.pstmt.setString(1, changePw.trim());
	        this.pstmt.setString(2, auth.trim()); 
	        
	        this.rs = this.pstmt.executeQuery();
	        
	        if (this.rs.next()) {
				result=1;
				System.out.println("업데이트 성공");
			} else {
				System.out.println("업데이트 실패");
			}
	        
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	// 휴대폰번호 변경 함수
	@Override
	public int updateTel(String auth, String changeTel) throws SQLException {
		int result = 0;
		
		String sql= "UPDATE kobusUser "
				+ "SET tel = ? "
				+ "WHERE id = ? ";
		
		try {
			
			this.pstmt = conn.prepareStatement(sql);
	        this.pstmt.setString(1, changeTel.trim());
	        this.pstmt.setString(2, auth.trim()); 
	        
	        this.rs = this.pstmt.executeQuery();
	        
	        if (this.rs.next()) {
				result=1;
				System.out.println("업데이트 성공");
			} else {
				System.out.println("업데이트 실패");
			}
	        
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	// 회원탈퇴 버튼누르면 로그아웃 시키고 db에서 회원정보삭제 
	@Override
	public String deleteUsr(String auth) throws SQLException {
		String result="fail";
		
		String sql = "DELETE FROM kobusUser "
				+ "WHERE id = ?";
		
		try {
			
			this.pstmt = conn.prepareStatement(sql);
	        this.pstmt.setString(1, auth.trim()); 
	        
	        this.rs = this.pstmt.executeQuery();
	        
	        if (this.rs.next()) {
				result="success";
				System.out.println("회원탈퇴 성공");
			} else {
				System.out.println("회원탈퇴 실패");
			}
	        
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	// 정기권 쿠폰갯수 함수
	@Override
	public int popCouponCount(String auth) throws SQLException {
		int popCouponCount = 0;
		
		String sql = "SELECT COUNT(*) AS popCoupon_count "
				+ "FROM payment p "
				+ "JOIN kobusUser u ON p.kusID = u.kusID "
				+ "WHERE u.id = ? ";
		
		try {
	        this.pstmt = conn.prepareStatement(sql);
	        this.pstmt.setString(1, auth.trim());
	        
	        this.rs = this.pstmt.executeQuery();
	        	        
	        if (this.rs.next()) {
	        	popCouponCount = rs.getInt("popCoupon_count"); 
	        }	
	        System.out.println("정기권 쿠폰갯수 : " + popCouponCount);
	       
	    } catch(SQLException e){
	    	e.printStackTrace();
	    }finally {
	        try { if (this.rs != null) this.rs.close(); } catch (SQLException e) { e.printStackTrace(); }
	        try { if (this.pstmt != null) this.pstmt.close(); } catch (SQLException e) { e.printStackTrace(); }
	    }
		
		return popCouponCount;
	}
	
	// 프리패스 쿠폰갯수 함수
	@Override
	public int freeCouponCount(String auth) throws SQLException {
		int freeCouponCount = 0;
		
		String sql = "SELECT COUNT(*) AS freeCoupon_count "
				+ "FROM FREE_PASS_PAYMENT frp "
				+ "JOIN kobusUser u ON frp.kusID = u.kusID "
				+ "WHERE u.id = ? ";
		
		try {
	        this.pstmt = conn.prepareStatement(sql);
	        this.pstmt.setString(1, auth.trim());
	        
	        this.rs = this.pstmt.executeQuery();
	        	        
	        if (this.rs.next()) {
	        	freeCouponCount = rs.getInt("freeCoupon_count"); 
	        }	
	        System.out.println("쿠폰갯수 : " + freeCouponCount);
	       
	    } catch(SQLException e){
	    	e.printStackTrace();
	    }finally {
	        try { if (this.rs != null) this.rs.close(); } catch (SQLException e) { e.printStackTrace(); }
	        try { if (this.pstmt != null) this.pstmt.close(); } catch (SQLException e) { e.printStackTrace(); }
	    }
		
		return freeCouponCount;
	}
	
}
