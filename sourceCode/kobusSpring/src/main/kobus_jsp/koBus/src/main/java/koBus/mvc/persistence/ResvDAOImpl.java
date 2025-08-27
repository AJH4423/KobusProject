package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import koBus.mvc.domain.ResvDTO;

public class ResvDAOImpl implements ResvDAO {
	
	
	private Connection conn = null;
	private PreparedStatement pstmt = null;
	private ResultSet rs = null;
	private ResvDTO dto = null;
	
	public ResvDAOImpl(Connection conn) {
		super();
		this.conn = conn;
	}
	
	public Connection getConn() {
		return conn;
	}
	
	public void setConn(Connection conn) {
		this.conn = conn;
	}

	@Override
	public List<ResvDTO> searchResvList(String loginId) throws SQLException {
		
		List<ResvDTO> resvList = new ArrayList<>();
		
		System.out.println("loginId " + loginId);
		
		String sql = 
			    "SELECT  " +
			    "    R.resID, " +
			    "    COUNT(S.seatNO) AS totalCount,  " +  // 인원 수 (좌석 수)
			    "    LISTAGG(S.seatNO, ',') WITHIN GROUP (ORDER BY S.seatNO) AS seatNO,  " +
			    "    COUNT(CASE WHEN RS.seatType = 'ADULT' THEN 1 END) AS aduCount,  " +  // 일반 좌석 수
			    "    COUNT(CASE WHEN RS.seatType = 'STUDENT' THEN 1 END) AS stuCount,  " +  // 학생 좌석 수
			    "    COUNT(CASE WHEN RS.seatType = 'CHILD' THEN 1 END) AS chdCount,  " +  // 아이 좌석 수
			    "    R.rideDate,  " +
			    "    R.resvDate,  " +
			    "    R.resvStatus,  " +
			    "    R.resvType,  " +
			    "    R.qrCode,  " +
			    "    RGD.regId AS deprRegCode,  " +
			    "    RGD.regName AS deprRegName,  " +
			    "    RGA.regId AS arrRegCode,  " +
			    "    RGA.regName AS arrRegName,  " +
			    "    C.comName, " +
			    "    B.busGrade,  " +
			    "    BS.durMin,  " +
			    "    PM.amount,  " +
			    "    PM.PAY_METHOD  " +
			    " FROM reservation R " +
			    " JOIN ReservedSeats RS ON R.resID = RS.resID " +
			    " JOIN seat S ON RS.seatID = S.seatID " +
			    " LEFT JOIN busSchedule BS ON R.bshID = BS.bshID " +
			    " LEFT JOIN kobusUser KU ON R.kusID = KU.kusID " +
			    " LEFT JOIN bus B ON BS.busID = B.busID " +
			    " LEFT JOIN company C ON B.comID = C.comID " +
			    " LEFT JOIN route RT ON BS.rouID = RT.rouID " +
			    " LEFT JOIN departure D ON RT.depID = D.depID " +
			    " LEFT JOIN arrival A ON RT.arrID = A.arrID " +
			    " LEFT JOIN region RGD ON D.regID = RGD.regID " +
			    " LEFT JOIN region RGA ON A.regID = RGA.regID " +
			    " JOIN RESERVATION_PAYMENT PM ON R.resID = PM.RES_ID " +
			    " WHERE KU.id = ? AND R.resvStatus = '결제완료' " + 
			    " GROUP BY " +
			    "    R.resID, R.rideDate, R.resvDate, R.resvStatus, R.resvType, R.qrCode, " +
			    "    RGD.regId, RGD.regName, RGA.regId, RGA.regName, " +
			    "    C.comName, B.busGrade, BS.durMin, PM.amount, PM.PAY_METHOD " +
			    " ORDER BY R.resvDate DESC";


		System.out.println(sql);
		
		this.pstmt = this.conn.prepareStatement(sql);
		
		this.pstmt.setString(1, loginId);
		this.rs = pstmt.executeQuery();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

		
		 while (rs.next()) {
		        String resID = rs.getString("resID");
		        int totalCount = rs.getInt("totalCount"); // 좌석 수
		        String seatNo = rs.getString("seatNO"); // "1,2,3번" 
		        int aduCount = rs.getInt("aduCount");
		        int stuCount = rs.getInt("stuCount");
		        int chdCount = rs.getInt("chdCount");
		        LocalDateTime rideDate = rs.getTimestamp("rideDate").toLocalDateTime();
		        String rideDateStr = rideDate.format(formatter);
		        LocalDateTime resvDate = rs.getTimestamp("resvDate").toLocalDateTime();
		        String resvDateStr = resvDate.format(formatter);
		        String resvStatus = rs.getString("resvStatus");
		        String resvType = rs.getString("resvType");
		        String qrCode = rs.getString("qrCode");
		        String deprRegCode = rs.getString("deprRegCode");
		        String deprRegName = rs.getString("deprRegName");
		        String arrRegCode = rs.getString("arrRegCode");
		        String arrRegName = rs.getString("arrRegName");
		        String comName = rs.getString("comName");
		        String busGrade = rs.getString("busGrade");
		        int durMin = rs.getInt("durMin");
		        int amount = rs.getInt("amount");
		        int totalcount = rs.getInt("totalCount");
		        String payMethod = rs.getString("PAY_METHOD");

		        this.dto = new ResvDTO().builder()
		                .resId(resID)
		                .totalCount(totalCount)
		                .seatNo(seatNo)
		                .aduCount(aduCount)
		                .stuCount(stuCount)
		                .chdCount(chdCount)
		                .rideDateStr(rideDateStr)
		                .resvStatus(resvStatus)
		                .resvDateStr(resvDateStr)
		                .resvType(resvType)
		                .qrCode(qrCode)
		                .deprRegCode(deprRegCode)
		                .deprRegName(deprRegName)
		                .arrRegCode(arrRegCode)
		                .arrRegName(arrRegName)
		                .comName(comName)
		                .busGrade(busGrade)
		                .durMin(durMin)
		                .amount(amount)
		                .totalCount(totalcount)
		                .payMethod(payMethod)
		                .build();

		        resvList.add(dto);
		    }

		
		return resvList;
	}

	@Override
	public int cancelResvList(String mrsMrnpNo) throws SQLException {
	    int result = 0;

	    try {
	        conn.setAutoCommit(false);  // 트랜잭션 시작

	        // 1. 예약 취소
	        // 트리거 사용 -> 좌석 상태 변경 + RESERVEDSEATS 테이블에서 예약 취소 된 좌석 삭제
	        String sql = "UPDATE RESERVATION "
	                   + "SET RESVSTATUS = '예약취소', SEATABLE = 'N' "
	                   + "WHERE RESID = ? AND RESVSTATUS = '결제완료' AND SEATABLE = 'Y'";
	        pstmt = conn.prepareStatement(sql);
	        pstmt.setString(1, mrsMrnpNo);
	        result = pstmt.executeUpdate();
	        
	        conn.commit();  // 커밋

	    } catch (SQLException e) {
	        conn.rollback();  // 실패 시 롤백
	        throw e;
	    } finally {
	        conn.setAutoCommit(true); // 자동 커밋 복원
	    }

	    // 변경된 행 수가 1 이상인지 확인 후 리턴
	    if (result > 0) {
	        return result;
	    } else {
	        return 0;
	    }
	}

	@Override
	public List<ResvDTO> searchCancelResvList(String loginId) throws SQLException {
		List<ResvDTO> cancelList = new ArrayList<>();
		
		System.out.println("loginId " + loginId);
		
		String sql = 
			    "SELECT  " +
			    "    R.resID, " +
			    "    COUNT(S.seatNO) AS totalCount,  " +  // 인원 수 (좌석 수)
			    "    LISTAGG(S.seatNO, ',') WITHIN GROUP (ORDER BY S.seatNO) AS seatNO,  " +
			    "    COUNT(CASE WHEN RS.seatType = 'ADULT' THEN 1 END) AS aduCount,  " +  // 일반 좌석 수
			    "    COUNT(CASE WHEN RS.seatType = 'STUDENT' THEN 1 END) AS stuCount,  " +  // 학생 좌석 수
			    "    COUNT(CASE WHEN RS.seatType = 'CHILD' THEN 1 END) AS chdCount,  " +  // 아이 좌석 수
			    "    R.rideDate,  " +
			    "    R.resvDate,  " +
			    "    R.resvStatus,  " +
			    "    R.resvType,  " +
			    "    R.qrCode,  " +
			    "    RGD.regId AS deprRegCode,  " +
			    "    RGD.regName AS deprRegName,  " +
			    "    RGA.regId AS arrRegCode,  " +
			    "    RGA.regName AS arrRegName,  " +
			    "    C.comName, " +
			    "    B.busGrade,  " +
			    "    BS.durMin,  " +
			    "    PM.amount,  " +
			    "    PM.PAY_METHOD  " +
			    " FROM reservation R " +
			    " FULL OUTER JOIN ReservedSeats RS ON R.resID = RS.resID " +
			    " FULL OUTER JOIN seat S ON RS.seatID = S.seatID " +
			    " FULL OUTER JOIN busSchedule BS ON R.bshID = BS.bshID " +
			    " FULL OUTER JOIN kobusUser KU ON R.kusID = KU.kusID " +
			    " FULL OUTER JOIN bus B ON BS.busID = B.busID " +
			    " FULL OUTER JOIN company C ON B.comID = C.comID " +
			    " FULL OUTER JOIN route RT ON BS.rouID = RT.rouID " +
			    " FULL OUTER JOIN departure D ON RT.depID = D.depID " +
			    " FULL OUTER JOIN arrival A ON RT.arrID = A.arrID " +
			    " FULL OUTER JOIN region RGD ON D.regID = RGD.regID " +
			    " FULL OUTER JOIN region RGA ON A.regID = RGA.regID " +
			    " FULL OUTER JOIN RESERVATION_PAYMENT PM ON R.resID = PM.RES_ID " +
			    " WHERE KU.id = ? AND R.resvStatus = '예약취소' " + 
			    " GROUP BY " +
			    "    R.resID, R.rideDate, R.resvDate, R.resvStatus, R.resvType, R.qrCode, " +
			    "    RGD.regId, RGD.regName, RGA.regId, RGA.regName, " +
			    "    C.comName, B.busGrade, BS.durMin, PM.amount, PM.PAY_METHOD " +
			    " ORDER BY R.resvDate DESC";


		
		this.pstmt = this.conn.prepareStatement(sql);
		
		this.pstmt.setString(1, loginId);
		this.rs = pstmt.executeQuery();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

		
		 while (rs.next()) {
		        String resID = rs.getString("resID");
		        int totalCount = rs.getInt("totalCount"); // 좌석 수
		        String seatNo = rs.getString("seatNO"); // "1,2,3" 등
		        int aduCount = rs.getInt("aduCount"); // "1,2,3" 등
		        int stuCount = rs.getInt("stuCount"); // "1,2,3" 등
		        int chdCount = rs.getInt("chdCount"); // "1,2,3" 등
		        LocalDateTime rideDate = rs.getTimestamp("rideDate").toLocalDateTime();
		        String rideDateStr = rideDate.format(formatter);
		        LocalDateTime resvDate = rs.getTimestamp("resvDate").toLocalDateTime();
		        String resvDateStr = resvDate.format(formatter);
		        String resvStatus = rs.getString("resvStatus");
		        String resvType = rs.getString("resvType");
		        String qrCode = rs.getString("qrCode");
		        String deprRegCode = rs.getString("deprRegCode");
		        String deprRegName = rs.getString("deprRegName");
		        String arrRegCode = rs.getString("arrRegCode");
		        String arrRegName = rs.getString("arrRegName");
		        String comName = rs.getString("comName");
		        String busGrade = rs.getString("busGrade");
		        int durMin = rs.getInt("durMin");
		        int amount = rs.getInt("amount");
		        int totalcount = rs.getInt("totalCount");
		        String payMethod = rs.getString("PAY_METHOD");

		        this.dto = new ResvDTO().builder()
		                .resId(resID)
		                .totalCount(totalCount)
		                .seatNo(seatNo)
		                .aduCount(aduCount)
		                .stuCount(stuCount)
		                .chdCount(chdCount)
		                .rideDateStr(rideDateStr)
		                .resvStatus(resvStatus)
		                .resvDateStr(resvDateStr)
		                .resvType(resvType)
		                .qrCode(qrCode)
		                .deprRegCode(deprRegCode)
		                .deprRegName(deprRegName)
		                .arrRegCode(arrRegCode)
		                .arrRegName(arrRegName)
		                .comName(comName)
		                .busGrade(busGrade)
		                .durMin(durMin)
		                .amount(amount)
		                .totalCount(totalcount)
		                .payMethod(payMethod)
		                .build();

		        cancelList.add(dto);
		    }

		
		return cancelList;
	}

	@Override
	public int changeRemainSeats(String mrsMrnpNo, String rideTime) throws SQLException {
		
		int seatResult = 0;
		
		try {

			conn.setAutoCommit(false);

			// 2. 좌석 상태 변경
			String seatSql = "UPDATE BUSSCHEDULE B "
					+ "SET REMAINSEATS = ( "
					+ "    SELECT COUNT(*) "
					+ "    FROM SEAT S "
					+ "    WHERE S.BUSID = B.BUSID "
					+ "      AND S.SEATABLE = 'Y' "
					+ " ) "
					+ " WHERE B.BSHID = ( "
					+ "    SELECT R.BSHID "
					+ "    FROM RESERVATION R "
					+ "    WHERE R.RESID = ? "
					+ "      AND R.RIDEDATE = TO_TIMESTAMP(?, 'YYYY-MM-DD HH24:MI:SS') "
					+ " ) " ;
			pstmt = conn.prepareStatement(seatSql);
			pstmt.setString(1, mrsMrnpNo);
			pstmt.setString(2, rideTime);
			seatResult = pstmt.executeUpdate();

			conn.commit();  // 커밋

		} catch (SQLException e) {
			conn.rollback();  // 실패 시 롤백
			throw e;
		} finally {
			conn.setAutoCommit(true); // 자동 커밋 복원
		}

		// 변경된 행 수가 1 이상인지 확인 후 리턴
		if (seatResult > 0) {
			return seatResult;
		} else {
			return 0;
		}

	}

	
	

}
