package board.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import board.dto.CommentDTO;
import com.util.ConnectionProvider;

public class CommentDAOImpl implements CommentDAO {

    @Override
    public List<CommentDTO> getCommentsByBrdID(int brdID) throws Exception {
        List<CommentDTO> list = new ArrayList<>();
        String sql = "SELECT * FROM brdComment WHERE brdID = ? ORDER BY cmtDate ASC";

        try (Connection conn = ConnectionProvider.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, brdID);

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    CommentDTO dto = new CommentDTO();
                    dto.setBcmID(rs.getInt("bcmID"));
                    dto.setBrdID(rs.getInt("brdID"));
                    dto.setKusID(rs.getString("kusID"));
                    dto.setContent(rs.getString("Content")); // 컬럼 대문자
                    dto.setCmtDate(rs.getTimestamp("cmtDate"));
                    list.add(dto);
                }
            }
        }
        return list;
    }

    @Override
    public int insertComment(CommentDTO dto) throws Exception {
        String sql = "INSERT INTO brdComment (bcmID, brdID, kusID, Content, cmtDate) "
                   + "VALUES (brdComment_seq.NEXTVAL, ?, ?, ?, SYSTIMESTAMP)";

        try (Connection conn = ConnectionProvider.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, dto.getBrdID());
            pstmt.setString(2, dto.getKusID());
            pstmt.setString(3, dto.getContent());

            return pstmt.executeUpdate();
        }
    }

    public int deleteComment(int bcmID, String kusID) throws Exception {
        String sql = "DELETE FROM brdComment WHERE bcmID = ? AND kusID = ?";

        try (Connection conn = ConnectionProvider.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, bcmID);
            pstmt.setString(2, kusID);
            return pstmt.executeUpdate();
        }
    }


    @Override
    public int updateComment(CommentDTO dto) throws Exception {
        String sql = "UPDATE brdComment SET content = ? WHERE bcmID = ? AND kusID = ?";

        try (Connection conn = ConnectionProvider.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, dto.getContent());
            pstmt.setInt(2, dto.getBcmID());
            pstmt.setString(3, dto.getKusID());  // 세션에서 받아온 사용자 ID
            return pstmt.executeUpdate();
        }
    }

}
