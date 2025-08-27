package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.util.ConnectionProvider;
import com.util.JdbcUtil;

import koBus.mvc.domain.SeatDTO;

public class SeatDAOImpl implements SeatDAO{

	private Connection conn = null;
	private PreparedStatement pstmt = null;
	private ResultSet rs = null;
	private SeatDTO dto = null;

	public SeatDAOImpl(Connection conn) {
		super();
		this.conn = conn;
	}

	public void setConn(Connection conn) {
		this.conn = conn;
	}

	public Connection getConn() {
		return conn;
	}
	
	@Override
	public String getBusId(String deprId, String arrId, String deprDtm) {
		
		String busId = null;
		
		System.out.printf("deprId = %s, arrId = %s, deprDtm = %s\n", deprId, arrId, deprDtm);
		
		String sql = "SELECT b.BUSID "
				+ "	FROM BUSSCHEDULE b "
				+ "	JOIN ROUTE r ON b.ROUID = r.ROUID "
				+ "	JOIN DEPARTURE d ON r.DEPID = d.DEPID "
				+ "	JOIN ARRIVAL a ON r.ARRID = a.ARRID "
				+ "	JOIN BUS bu ON b.BUSID = bu.BUSID "
				+ "	WHERE d.REGID = ? "
				+ "  AND a.REGID = ? "
				+ "  AND b.DEPARTUREDATE = TO_TIMESTAMP(?, 'YYYYMMDD HH24:MI') ";
		
		 try {
			 
			 if (deprDtm != null && deprDtm.length() >= 16) {
		            String datePart = deprDtm.substring(0, 10).replace("-", ""); // ex: 2025-06-28 → 20250628
		            String timePart = deprDtm.substring(11, 16);                 // ex: 08:00:00 → 08:00
		            deprDtm = datePart + " " + timePart;                        // ex: 20250628 08:00
		        }   
			 
			 this.pstmt = conn.prepareStatement(sql);
		        this.pstmt.setString(1, deprId);
		        this.pstmt.setString(2, arrId);
		        this.pstmt.setString(3, deprDtm);
		        this.rs = pstmt.executeQuery();
		        
		        if (rs.next()) {
		        	busId = rs.getString("BUSID");
		        }
		        


		    } catch (Exception e) {
		        e.printStackTrace();
		    } finally {
		        JdbcUtil.close(this.rs);
		        JdbcUtil.close(this.pstmt);
		    }
		
		return busId;
	}

	@Override
	public int getTotalSeats(String busId) throws SQLException {
		/* String busId = request.getParameter("BUSID"); */
	    int seatTotal = 0;
	    
	    String sql = "SELECT BUSSEATS FROM BUS WHERE BUSID = ?";

	    try {
	        this.pstmt = conn.prepareStatement(sql);
	        this.pstmt.setString(1, busId);
	        this.rs = pstmt.executeQuery();
	        
	        if (rs.next()) {
	        	seatTotal = rs.getInt("BUSSEATS");
	        }
	        

	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        JdbcUtil.close(this.rs);
	        JdbcUtil.close(this.pstmt);
	    }
		
		
		return seatTotal;
	}

	@Override
	public List<SeatDTO> searchSeat(String busId) throws SQLException {
		
		List<SeatDTO> list = null;
		String sql = "select seatid, busid, seatno, seattype, seatable "
				+ " from seat "
				+ " where busid = ? ";
		
		String seatId; 		
		int seatNo; 		
		String seatType; 
		String seatAble;
		
		this.pstmt = conn.prepareStatement(sql);
		this.pstmt.setString(1, busId);
		this.rs = this.pstmt.executeQuery();
		
		
		if (this.rs.next()) {
			list = new ArrayList<SeatDTO>();
			do {
				
				seatId = this.rs.getString("seatId");
				seatNo = this.rs.getInt("seatNo");
				busId = this.rs.getString("busId");
				seatType = this.rs.getString("seatType");
				seatAble = this.rs.getString("seatAble");
				
				this.dto = new SeatDTO().builder().
						seatId(seatId).
						seatNo(seatNo).
						busId(busId).
						seatType(seatType).
						seatAble(seatAble).build();
				list.add(dto);
				
				
			} while (this.rs.next());
		}
		
		
		JdbcUtil.close(this.rs);
        JdbcUtil.close(this.pstmt);
		
		return list;
	}


	@Override
	public String searchSeatId(List<String> seatIdList) throws SQLException  {
		if (seatIdList == null || seatIdList.isEmpty()) {
	        return "";  // 빈 문자열 반환 (null 아님)
	    }

	    String placeholders = seatIdList.stream()
	                                   .map(s -> "?")
	                                   .collect(Collectors.joining(", "));

	    String sql = "SELECT LISTAGG(TO_CHAR(seatNo), ',') WITHIN GROUP (ORDER BY seatNo) AS seatNos "
	               + "FROM seat "
	               + "WHERE seatId IN (" + placeholders + ")";

	    try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
	        for (int i = 0; i < seatIdList.size(); i++) {
	            pstmt.setString(i + 1, seatIdList.get(i));
	        }

	        try (ResultSet rs = pstmt.executeQuery()) {
	            String seatNosStr = "";  // 변수 선언 및 초기화
	            if (rs.next()) {
	                seatNosStr = rs.getString("seatNos");
	                if (seatNosStr == null) {
	                    seatNosStr = "";
	                }
	            }
	            return seatNosStr;  // 변수에 담아 반환
	        }
	    }

	}

}
