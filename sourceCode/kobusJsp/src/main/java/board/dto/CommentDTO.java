package board.dto;

import java.sql.Timestamp;

public class CommentDTO {
    private int bcmID;            // 댓글 ID
    private int brdID;            // 게시글 ID
    private String kusID;         // 작성자 ID
    private String content;       // 댓글 내용
    private Timestamp cmtDate;    // 작성일

    // 기본 생성자
    public CommentDTO() {}

    // 전체 필드 생성자
    public CommentDTO(int bcmID, int brdID, String kusID, String content, Timestamp cmtDate) {
        this.bcmID = bcmID;
        this.brdID = brdID;
        this.kusID = kusID;
        this.content = content;
        this.cmtDate = cmtDate;
    }

    // Getter / Setter
    public int getBcmID() {
        return bcmID;
    }

    public void setBcmID(int bcmID) {
        this.bcmID = bcmID;
    }

    public int getBrdID() {
        return brdID;
    }

    public void setBrdID(int brdID) {
        this.brdID = brdID;
    }

    public String getKusID() {
        return kusID;
    }

    public void setKusID(String kusID) {
        this.kusID = kusID;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getCmtDate() {
        return cmtDate;
    }

    public void setCmtDate(Timestamp cmtDate) {
        this.cmtDate = cmtDate;
    }
}
