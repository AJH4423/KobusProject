package org.kobus.spring.service.board;

import java.util.List;

import org.kobus.spring.domain.board.BoardDTO;

public interface BoardService {
    List<BoardDTO> getBoardList();

    void saveBoard(BoardDTO dto);

	BoardDTO getBoardById(int brdID);

	void updateBoard(BoardDTO dto);

	void deleteBoard(int brdID);
}
