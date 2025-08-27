package board.dao;

import java.util.List;
import board.dto.CommentDTO;

public interface CommentDAO {
    // 특정 게시글에 달린 댓글 전체 조회
    List<CommentDTO> getCommentsByBrdID(int brdID) throws Exception;

    // 댓글 등록
    int insertComment(CommentDTO dto) throws Exception;

    // 댓글 삭제 (PK 기준)
    int deleteComment(int bcmID, String kusID) throws Exception;


    // 댓글 수정 (선택)
    int updateComment(CommentDTO dto) throws Exception;
}
