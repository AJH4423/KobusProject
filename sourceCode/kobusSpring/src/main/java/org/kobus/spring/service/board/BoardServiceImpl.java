package org.kobus.spring.service.board;

import java.util.List;

import org.kobus.spring.domain.board.BoardDTO;
import org.kobus.spring.mapper.board.BoardMapper;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService {

    private final BoardMapper boardMapper;

    public BoardServiceImpl(BoardMapper boardMapper) {
        this.boardMapper = boardMapper;
    }

    @Override
    public List<BoardDTO> getBoardList() {
        return boardMapper.selectBoardList();
    }

    @Override
    public BoardDTO getBoardById(int brdID) {
        return boardMapper.getBoardById(brdID);
    }

    @Override
    public void saveBoard(BoardDTO board) {
        boardMapper.save(board);
    }

    @Override
    public void updateBoard(BoardDTO dto) {
        boardMapper.updateBoard(dto);
    }

    @Override
    public void deleteBoard(int brdID) {
        boardMapper.deleteBoard(brdID);
    }
}

