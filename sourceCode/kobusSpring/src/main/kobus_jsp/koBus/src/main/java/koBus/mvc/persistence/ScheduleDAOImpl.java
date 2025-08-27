package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import koBus.mvc.domain.ScheduleDTO;

public class ScheduleDAOImpl implements ScheduleDAO {

	private Connection conn = null;
	private PreparedStatement pstmt = null;
	private ResultSet rs = null;

	public ScheduleDAOImpl(Connection conn) {
		this.conn = conn;
	}

	@Override
	public List<ScheduleDTO> selectBySidoCode(int sidoCode) {
		List<ScheduleDTO> list = new ArrayList<>();

		String sql = "SELECT * FROM region WHERE sidoCode = ?";

		try {

			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, sidoCode); 
			rs = pstmt.executeQuery();

			while (rs.next()) {
				String regID = rs.getString("regID");
				String regName = rs.getString("regName");
				int sc = rs.getInt("sidoCode");

				ScheduleDTO dto = new ScheduleDTO().builder()
						.regID(regID)
						.regName(regName)
						.sidoCode(sc)
						.build();

				list.add(dto);
			}

//			System.out.println("list.size() " + list.size());

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try { if (rs != null) rs.close(); } catch (Exception e) {}
			try { if (pstmt != null) pstmt.close(); } catch (Exception e) {}
		}

		return list;
	}

	@Override
	public List<ScheduleDTO> selectByRegion() {
		List<ScheduleDTO> list = new ArrayList<>();

		String sql = "SELECT * FROM region ";

		try {
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();

			while (rs.next()) {
				String regID = rs.getString("regID");
				String regName = rs.getString("regName");
				int sc = rs.getInt("sidoCode");

				ScheduleDTO dto = new ScheduleDTO().builder()
						.regID(regID)
						.regName(regName)
						.sidoCode(sc)
						.build();

				list.add(dto);
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try { if (rs != null) rs.close(); } catch (Exception e) {}
			try { if (pstmt != null) pstmt.close(); } catch (Exception e) {}
		}

		return list;
	}

	@Override
	public List<ScheduleDTO> searchBusSchedule(String deprId, String arrId, String deprDtm, String busClsCd) throws SQLException {
		List<ScheduleDTO> schList = new ArrayList<>();

		
		System.out.printf("deprId : %s, arrId : %s, deprDtm : %s, busClsCd :  %s\n", deprId, arrId, deprDtm, busClsCd);
		

		String sql = "SELECT "
				+ " BS.BSHID, "
				+ " BS.ROUID, "
				+ " BS.BUSID,  "
				+ " BS.DEPARTUREDATE, "
				+ " C.COMNAME, "
				+ " B.BUSGRADE, "
				+ " BS.DURMIN, "
				+ " BS.ADULTFARE, "
				+ " BS.STUFARE, "
				+ " BS.CHILDFARE, "
				+ " BS.ARRIVALDATE, "
				+ " BS.REMAINSEATS,  "
				+ " B.BUSSEATS  "
				+ " FROM busschedule BS "
				+ " JOIN BUS B ON BS.BUSID = B.BUSID "
				+ " JOIN COMPANY C ON B.COMID = C.COMID "
				+ " JOIN ROUTE R ON BS.ROUID = R.ROUID "
				+ " JOIN arrival A ON A.ARRID = R.ARRID "
				+ " JOIN departure D ON D.DEPID = R.DEPID "
				+ " JOIN REGION RGD ON D.REGID = RGD.REGID  "
				+ " JOIN REGION RGA ON A.REGID = RGA.REGID "
				+ " WHERE RGD.REGID = ? AND RGA.REGID = ? ";
		
		
		
		
		if (deprDtm != null) {
		    // Case 1: "yyyy-MM-dd HH:mm:ss"
		    if (deprDtm.trim().matches("\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}")) {
		        String datePart = deprDtm.substring(0, 10).replace("-", "");
		        String timePart = deprDtm.substring(11, 16);  // HH:mm
		        deprDtm = datePart + " " + timePart;

		        sql += " AND BS.DEPARTUREDATE = TO_TIMESTAMP(?, 'YYYYMMDD HH24:MI') ";
		        
		    } 
		    
		 // Case 2: "yyyy-MM-dd HH:mm"
		    else if (deprDtm.trim().matches("\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}")) {
		    	deprDtm = deprDtm.replaceAll("-", "").substring(0, 8) + " " + deprDtm.substring(11, 16);

		        sql += " AND BS.DEPARTUREDATE = TO_TIMESTAMP(?, 'YYYYMMDD HH24:MI') ";
		    }
		    
		 // Case 3: "yyyy-MM-dd"
		    else if (deprDtm.trim().matches("\\d{4}-\\d{2}-\\d{2}")) {
		        deprDtm = deprDtm.replace("-", "");

		        sql += " AND TRUNC(BS.DEPARTUREDATE) = TO_DATE(?, 'YYYYMMDD') ";

		    // Case 4: "yyyyMMdd HH:mm"
		    } else if (deprDtm.trim().matches("\\d{8} \\d{2}:\\d{2}")) {
		        sql += " AND BS.DEPARTUREDATE = TO_TIMESTAMP(?, 'YYYYMMDD HH24:MI') ";

		    // Case 5: "yyyyMMdd"
		    } else if (deprDtm.trim().matches("\\d{8}")) {
		        sql += " AND TRUNC(BS.DEPARTUREDATE) = TO_DATE(?, 'YYYYMMDD') ";

		     // Case 6: "yyyyMMdd HH:mm:ss"
		    } else if (deprDtm.matches("\\d{8} \\d{2}:\\d{2}:\\d{2}")) {
		        sql += " AND BS.DEPARTUREDATE = TO_TIMESTAMP(?, 'YYYYMMDD HH24:MI:SS') ";
		    } else {
		        System.out.println("입력 형식이 올바르지 않습니다.");
		    }
		}


		System.out.println(sql);

		if (!busClsCd.equals("전체")) {
		    sql += " AND B.BUSGRADE = ? ";
		}

		pstmt = conn.prepareStatement(sql);
		int paramIndex = 1;

		pstmt.setString(paramIndex++, deprId);
		pstmt.setString(paramIndex++, arrId);
		pstmt.setString(paramIndex++, deprDtm);  // TO_DATE 또는 TO_TIMESTAMP 둘 중 하나

		if (!("전체".equals(busClsCd) || "0".equals(busClsCd))) {
		    pstmt.setString(paramIndex++, busClsCd);
		}


		rs = pstmt.executeQuery();


		while (rs.next()) {
			LocalDateTime departureDate = rs.getTimestamp("departureDate").toLocalDateTime();	
			String comName = rs.getString("comName");
			String busGrade = rs.getString("busGrade");
			int adultFare = rs.getInt("adultFare");
			int stuFare = rs.getInt("stuFare");
			int childFare = rs.getInt("childFare");
			LocalDateTime arrivalDate = rs.getTimestamp("arrivalDate").toLocalDateTime();	
			int durMin = rs.getInt("durMin");
			String bshId = rs.getString("bshId");
			String busId = rs.getString("busId");
			int remainSeats = rs.getInt("remainSeats");
			int busSeats = rs.getInt("busSeats");

			ScheduleDTO schDto = new ScheduleDTO().builder()
					.departureDate(departureDate)
					.comName(comName)
					.busGrade(busGrade)
					.adultFare(adultFare)
					.stuFare(stuFare)
					.childFare(childFare)
					.departureDate(departureDate)
					.arrivalDate(arrivalDate)
					.durMin(durMin)
					.bshId(bshId)
					.busId(busId)
					.remainSeats(remainSeats)
					.busSeats(busSeats)
					.build();

			schList.add(schDto);
		}
		

		return schList;
	}

	@Override
	public int getDurationFromRoute(String deprRegId, String arvlRegId) throws SQLException {
	    int duration = 0;

	    String sql = "SELECT R.duration " +
	                 "FROM route R " +
	                 "JOIN departure D ON R.depid = D.depid " +
	                 "JOIN arrival A ON R.arrid = A.arrid " +
	                 "JOIN region RG_D ON D.regid = RG_D.regid " +
	                 "JOIN region RG_A ON A.regid = RG_A.regid " +
	                 "WHERE RG_D.regid = ? AND RG_A.regid = ?";

	    try {
	        pstmt = conn.prepareStatement(sql);
	        pstmt.setString(1, deprRegId);
	        pstmt.setString(2, arvlRegId);

	        rs = pstmt.executeQuery();
	        if (rs.next()) {
	            duration = rs.getInt("duration");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        try { if (rs != null) rs.close(); } catch (Exception e) {}
	        try { if (pstmt != null) pstmt.close(); } catch (Exception e) {}
	    }

	    return duration;
	}
}
