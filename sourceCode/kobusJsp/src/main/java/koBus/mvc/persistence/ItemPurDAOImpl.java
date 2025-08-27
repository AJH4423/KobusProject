package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import koBus.mvc.domain.ItemCanclePurDTO;
import koBus.mvc.domain.ItemPurDTO;
import koBus.mvc.domain.ResvDTO;

public class ItemPurDAOImpl implements ItemPurDAO{

	private Connection conn = null;
	private PreparedStatement pstmt = null;
	private ResultSet rs = null;
	private ItemPurDTO dto = null;
	private ItemCanclePurDTO cdto = null;
	
	public ItemPurDAOImpl(Connection conn) {
		super();
		this.conn = conn;
	}
	
	public Connection getConn() {
		return conn;
	}
	
	public void setConn(Connection conn) {
		this.conn = conn;
	}
	
	// 정기권 결제정보 테이블 내역 가져오기
	@Override
	public List<ItemPurDTO> itemPopPurList(String loginId) throws SQLException {
		// 정기권 구매내역 리스트 나타내기
		List<ItemPurDTO> popItemList = new ArrayList<ItemPurDTO>();
		
		String sql = "SELECT PAYMENT_ID, pay_status, startdate, amount FROM PAYMENT py "
				+ "join kobususer ku on py.kusid = ku.kusid "
				+ "WHERE pay_status = '결제완료' AND ku.id = ? ";
		
		this.pstmt = this.conn.prepareStatement(sql);
		
		this.pstmt.setString(1, loginId);
		this.rs = pstmt.executeQuery();
		
		while (rs.next()) {
			int couponID = rs.getInt("PAYMENT_ID");
			String couponName = "정기권";
			String payStatus = rs.getString("pay_status");
			Date startDate = rs.getDate("startdate");
			int amount = rs.getInt("amount");
			
			dto = ItemPurDTO.builder()
								.couponID(couponID)
								.couponName(couponName)
								.payStatus(payStatus)
								.startDate(startDate)
								.amount(amount)
								.build();
			popItemList.add(dto);
		}
		
		return popItemList; // 프리패스 결제내역이 담겨있는값 보내주기
	}
	
	// 프리패스 결제정보 테이블 내역 가져오기
	@Override
	public List<ItemPurDTO> itemFreePurList(String loginId) throws SQLException {
		// 프리패스 구매내역 리스트 나타내기
		List<ItemPurDTO> freeItemList = new ArrayList<ItemPurDTO>();
		
		String sql = "SELECT FREE_PASS_PAYMENT_ID, pay_status, startdate, amount FROM FREE_PASS_PAYMENT frppy "
				+ "join kobususer ku on frppy.kusid = ku.kusid "
				+ "WHERE pay_status = '결제완료' AND ku.id = ? ";
		
		this.pstmt = this.conn.prepareStatement(sql);
		
		this.pstmt.setString(1, loginId);
		this.rs = pstmt.executeQuery();
		
		while (rs.next()) {
			int couponID = rs.getInt("FREE_PASS_PAYMENT_ID");
			String couponName = "프리패스";
			String payStatus = rs.getString("pay_status");
			Date startDate = rs.getDate("startdate");
			int amount = rs.getInt("amount");
			
			dto = ItemPurDTO.builder()
								.couponID(couponID)
								.couponName(couponName)
								.payStatus(payStatus)
								.startDate(startDate)
								.amount(amount)
								.build();
			freeItemList.add(dto);
		}
		
		return freeItemList;
	}
	
	// 결제취소한 정기권 리스트 가져오기
	@Override
	public List<ItemCanclePurDTO> itemCanclePopPurList(String loginId) throws SQLException {
		List<ItemCanclePurDTO> popCancleItemList = new ArrayList<ItemCanclePurDTO>();
		
		String sql = "SELECT PAYMENT_ID, pay_status, startdate, amount FROM PAYMENT py "
				+ "join kobususer ku on py.kusid = ku.kusid "
				+ "WHERE pay_status = '결제취소' AND ku.id = ? ";
		
		this.pstmt = this.conn.prepareStatement(sql);
		
		this.pstmt.setString(1, loginId);
		this.rs = pstmt.executeQuery();
		
		while (rs.next()) {
			int couponID = rs.getInt("PAYMENT_ID");
			String couponName = "정기권";
			String payStatus = rs.getString("pay_status");
			Date startDate = rs.getDate("startdate");
			int amount = rs.getInt("amount");
			
			cdto = ItemCanclePurDTO.builder()
								.couponID(couponID)
								.couponName(couponName)
								.payStatus(payStatus)
								.startDate(startDate)
								.amount(amount)
								.build();
			popCancleItemList.add(cdto);  
		}
		
		return popCancleItemList; // 프리패스 결제내역이 담겨있는값 보내주기
	}
	
	// 결제취소한 프리패스 리스트 가져오기
	@Override
	public List<ItemCanclePurDTO> itemCancleFreePurList(String loginId) throws SQLException {
		List<ItemCanclePurDTO> freeCancleItemList = new ArrayList<ItemCanclePurDTO>();
		
		String sql = "SELECT FREE_PASS_PAYMENT_ID, pay_status, startdate, amount FROM FREE_PASS_PAYMENT frppy "
				+ "join kobususer ku on frppy.kusid = ku.kusid "
				+ "WHERE pay_status = '결제취소' AND ku.id = ? ";
		
		this.pstmt = this.conn.prepareStatement(sql);
		
		this.pstmt.setString(1, loginId);
		this.rs = pstmt.executeQuery();
		
		while (rs.next()) {
			int couponID = rs.getInt("FREE_PASS_PAYMENT_ID");
			String couponName = "프리패스";
			String payStatus = rs.getString("pay_status");
			Date startDate = rs.getDate("startdate");
			int amount = rs.getInt("amount");
			
			cdto = ItemCanclePurDTO.builder()
								.couponID(couponID)
								.couponName(couponName)
								.payStatus(payStatus)
								.startDate(startDate)
								.amount(amount)
								.build();
			freeCancleItemList.add(cdto);
		}
		
		return freeCancleItemList;
	}

	@Override
	public int popDelete(String loginId, String popId) throws SQLException {
		
		int result = 0;
		
		String sql = "UPDATE ( "
				+ "    SELECT p.PAY_STATUS "
				+ "    FROM payment p "
				+ "    JOIN kobusUser ku ON p.kusID = ku.kusID "
				+ "    WHERE ku.id = ? "
				+ "      AND p.PAYMENT_ID = ? "
				+ ") "
				+ "SET PAY_STATUS = '결제취소' ";
		
		this.pstmt = this.conn.prepareStatement(sql);
		this.pstmt.setString(1, loginId);
		this.pstmt.setString(2, popId);
		
		result = pstmt.executeUpdate();
		
		return result;
	}

	@Override
	public int freeDelete(String loginId, String popId) throws SQLException {
		int result = 0;
		
		String sql = "UPDATE ( "
				+ "    SELECT p.PAY_STATUS "
				+ "    FROM FREE_PASS_PAYMENT p "
				+ "    JOIN kobusUser ku ON p.kusID = ku.kusID "
				+ "    WHERE ku.id = ? "
				+ "      AND p.FREE_PASS_PAYMENT_ID = ? "
				+ ") "
				+ "SET PAY_STATUS = '결제취소' ";
		
		this.pstmt = this.conn.prepareStatement(sql);
		this.pstmt.setString(1, loginId);
		this.pstmt.setString(2, popId);
		
		result = pstmt.executeUpdate();
		
		return result;
	}
	
}
