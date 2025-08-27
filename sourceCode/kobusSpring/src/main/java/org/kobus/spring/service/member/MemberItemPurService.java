package org.kobus.spring.service.member;

import java.sql.SQLException;
import java.util.List;

import org.kobus.spring.domain.member.ItemCanclePurDTO;
import org.kobus.spring.domain.member.ItemPurDTO;

public interface MemberItemPurService {

	// 정기권 결제 테이블 리스트 가져오기
	List<ItemPurDTO> itemPopPurList(String loginId) throws SQLException; 

	// 프리패스 결제 테이블 리스트 가져오기
	List<ItemPurDTO> itemFreePurList(String loginId) throws SQLException; 

	// 정기권 결제 테이블 리스트 가져오기
	List<ItemCanclePurDTO> itemCanclePopPurList(String loginId) throws SQLException; 

	// 프리패스 결제 테이블 리스트 가져오기
	List<ItemCanclePurDTO> itemCancleFreePurList(String loginId) throws SQLException; 

	// 정기권 취소 -> 결제취소로 변경
	int popDelete(String loginId, String popId) throws SQLException; 

	// 프리패스 취소 -> 결제취소로 변경
	int freeDelete(String loginId, String popId) throws SQLException;

}
