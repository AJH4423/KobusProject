package org.kobus.spring.domain.board;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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


}
