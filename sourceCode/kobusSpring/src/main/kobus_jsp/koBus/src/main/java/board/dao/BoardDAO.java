package board.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import javax.naming.NamingException;

import com.util.ConnectionProvider;
import board.dto.BoardDTO;

public class BoardDAO {

	public BoardDAO() {
	}

	public BoardDAO(Connection conn) {
	}

	// 글 저장
	public int insertBoard(BoardDTO dto) throws Exception {
		String sql = "INSERT INTO board (brdId, kusId, brdTitle, brdContent, brdDate, brdViews) "
				+ "VALUES (board_seq.nextval, ?, ?, ?, SYSTIMESTAMP, ?)";
		try (Connection conn = ConnectionProvider.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
			ps.setString(1, dto.getKusID());
			ps.setString(2, dto.getBrdTitle());
			ps.setString(3, dto.getBrdContent());
			ps.setInt(4, dto.getBrdViews());

			return ps.executeUpdate();
		} catch (SQLException e) {
			System.err.println("BoardDAO - insertBoard 오류: " + e.getMessage());
			throw e;
		}
	}

	// 글 목록
	public List<BoardDTO> getBoardList() throws Exception, SQLException, NamingException {
	    List<BoardDTO> list = new ArrayList<>();
	    
	    String sql = "SELECT b.brdID, b.kusID, b.brdTitle, b.brdContent, b.brdDate, b.brdViews, " +
	                 "u.ID AS userId, u.tel, u.RANK AS userRank " +
	                 "FROM board b " +
	                 "JOIN kobusUser u ON b.kusID = u.kusID " +
	                 "ORDER BY b.brdDate DESC"; // 🔥 작성일 기준 최신순

	    try (Connection conn = ConnectionProvider.getConnection();
	         PreparedStatement ps = conn.prepareStatement(sql);
	         ResultSet rs = ps.executeQuery()) {

	        while (rs.next()) {
	            BoardDTO dto = new BoardDTO();
	            dto.setBrdID(rs.getInt("brdID"));
	            dto.setKusID(rs.getString("kusID"));
	            dto.setBrdTitle(rs.getString("brdTitle"));
	            dto.setBrdContent(rs.getString("brdContent"));
	            dto.setBrdDate(rs.getTimestamp("brdDate"));
	            dto.setBrdViews(rs.getInt("brdViews"));

	            dto.setUserId(rs.getString("userId"));
	            dto.setUserTel(rs.getString("tel"));
	            dto.setUserRank(rs.getString("userRank"));

	            list.add(dto);
	        }

	    } catch (SQLException | NamingException e) {
	        System.err.println("BoardDAO - getBoardList 오류: " + e.getMessage());
	        throw e;
	    }

	    return list;
	}


	// 글 상세 보기
	public BoardDTO getBoard(int brdID) throws Exception, SQLException, NamingException {
		BoardDTO dto = null;
		String sql = "SELECT b.brdID, b.kusID, b.brdTitle, b.brdContent, b.brdDate, b.brdViews, "
				+ "u.ID AS userId, u.tel, u.RANK " + "FROM board b " + "JOIN kobusUser u ON b.kusID = u.kusID "
				+ "WHERE b.brdID = ?";

		try (Connection conn = ConnectionProvider.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setInt(1, brdID);

			try (ResultSet rs = ps.executeQuery()) {
				if (rs.next()) {
					dto = new BoardDTO();
					dto.setBrdID(rs.getInt("brdID"));
					dto.setKusID(rs.getString("kusID"));
					dto.setBrdTitle(rs.getString("brdTitle"));
					dto.setBrdContent(rs.getString("brdContent"));
					dto.setBrdDate(rs.getTimestamp("brdDate"));
					dto.setBrdViews(rs.getInt("brdViews"));

					dto.setUserId(rs.getString("userId"));
					dto.setUserTel(rs.getString("tel"));
					dto.setUserRank(rs.getString("RANK"));
				}
			}

		} catch (SQLException | NamingException e) {
			System.err.println("BoardDAO - getBoard 오류: " + e.getMessage());
			throw e;
		}

		return dto;
	}

	// 글 수정
	public int updateBoard(BoardDTO dto) throws Exception, SQLException, NamingException {
		String sql = "UPDATE board SET brdTitle = ?, brdContent = ?, brdDate = SYSTIMESTAMP " + "WHERE brdID = ?";

		try (Connection conn = ConnectionProvider.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setString(1, dto.getBrdTitle());
			ps.setString(2, dto.getBrdContent());
			ps.setInt(3, dto.getBrdID());

			return ps.executeUpdate();
		} catch (SQLException | NamingException e) {
			System.err.println("BoardDAO - updateBoard 오류: " + e.getMessage());
			throw e;
		}
	}

	// 글 삭제
	public int deleteBoard(int brdID) throws Exception, SQLException, NamingException {
		String sql = "DELETE FROM board WHERE brdID = ?";

		try (Connection conn = ConnectionProvider.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setInt(1, brdID);
			return ps.executeUpdate();
		} catch (SQLException | NamingException e) {
			System.err.println("BoardDAO - deleteBoard 오류: " + e.getMessage());
			throw e;
		}
	}

	// 조회수 증가
	public int incrementViewCount(int brdID) throws Exception, SQLException, NamingException {
		String sql = "UPDATE board SET brdViews = brdViews + 1 WHERE brdID = ?";

		try (Connection conn = ConnectionProvider.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setInt(1, brdID);
			return ps.executeUpdate();
		} catch (SQLException | NamingException e) {
			System.err.println("BoardDAO - incrementViewCount 오류: " + e.getMessage());
			throw e;
		}
	}

	// 게시물 검색
	public List<BoardDTO> searchBoard(String keyword) throws SQLException, Exception {
		List<BoardDTO> list = new ArrayList<>();
		String sql = "SELECT * FROM board WHERE brdTitle LIKE ? OR brdContent LIKE ? ORDER BY brdDate DESC";
		try (Connection conn = ConnectionProvider.getConnection();
				PreparedStatement pstmt = conn.prepareStatement(sql)) {
			pstmt.setString(1, "%" + keyword + "%");
			pstmt.setString(2, "%" + keyword + "%");
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				BoardDTO dto = new BoardDTO();
				dto.setBrdID(rs.getInt("brdID"));
				dto.setBrdTitle(rs.getString("brdTitle"));
				dto.setBrdContent(rs.getString("brdContent"));
				dto.setBrdDate(rs.getTimestamp("brdDate"));
				dto.setBrdViews(rs.getInt("brdViews"));
				dto.setKusID(rs.getString("kusID"));
				list.add(dto);
			}
		}
		return list;
	}

}
