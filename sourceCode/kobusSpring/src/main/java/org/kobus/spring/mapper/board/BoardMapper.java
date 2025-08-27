package org.kobus.spring.mapper.board;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kobus.spring.domain.board.BoardDTO;

@Mapper
public interface BoardMapper {
    List<BoardDTO> selectBoardList();

	BoardDTO getBoardById(int brdID);

	void insertBoard(BoardDTO dto);

	void updateBoard(BoardDTO dto);

	void deleteBoard(int brdID);
	
	void save(BoardDTO dto);
	
	
}
