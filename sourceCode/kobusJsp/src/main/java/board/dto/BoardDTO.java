package board.dto;

import java.sql.Timestamp;

public class BoardDTO {

	private int brdID; // 게시글 번호
	private String kusID; // 작성자 ID (String형으로 받아오는 구조로 유지)
	private String brdTitle; // 제목
	private String brdContent; // 내용
	private Timestamp brdDate; // 작성일
	private int brdViews; // 조회수

	// 추가: 작성자 상세 정보용 필드 (조인용)
	private String userId; // 작성자 ID (화면에 보여줄 용도, kobusUser.ID)
	private String userTel; // 작성자 전화번호
	private String userRank; // 작성자 등급

	// --- Getter / Setter ---

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

	public String getBrdTitle() {
		return brdTitle;
	}

	public void setBrdTitle(String brdTitle) {
		this.brdTitle = brdTitle;
	}

	public String getBrdContent() {
		return brdContent;
	}

	public void setBrdContent(String brdContent) {
		this.brdContent = brdContent;
	}

	public Timestamp getBrdDate() {
		return brdDate;
	}

	public void setBrdDate(Timestamp brdDate) {
		this.brdDate = brdDate;
	}

	public int getBrdViews() {
		return brdViews;
	}

	public void setBrdViews(int brdViews) {
		this.brdViews = brdViews;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserTel() {
		return userTel;
	}

	public void setUserTel(String userTel) {
		this.userTel = userTel;
	}

	public String getUserRank() {
		return userRank;
	}

	public void setUserRank(String userRank) {
		this.userRank = userRank;
	}
}
