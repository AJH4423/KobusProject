package org.kobus.spring.domain.board;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.kobus.spring.domain.member.UserMapper;
import org.kobus.spring.service.board.BoardService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class BoardController {

    private final BoardService boardService;
    private final UserMapper userMapper;
    public BoardController(BoardService boardService,  UserMapper userMapper) {
        this.boardService = boardService;
		this.userMapper = userMapper;
		
    }

    @GetMapping("/board/list.do")
    public String list(Model model) {
        List<BoardDTO> boardList = boardService.getBoardList();
        model.addAttribute("list", boardList);
        return "board.boardList";
    }

    @GetMapping("/board/view.do")
    public String view(@RequestParam("brdID") int brdID, Model model, HttpSession session) {
        BoardDTO board = boardService.getBoardById(brdID);
        model.addAttribute("dto", board);

        // 세션에서 로그인 ID 꺼내서 kusID 조회 후 모델에 담기
        String loginId = (String) session.getAttribute("auth");
        if (loginId != null) {
            String loginKusID = userMapper.getKusIDById(loginId);
            model.addAttribute("loginKusID", loginKusID);
        }

        return "board.boardView";
    }

    
    @GetMapping("/board/write.do")
    public String writeForm() {
        return "board.boardWrite";
    }


@PostMapping("/board/write.do")
public String write(BoardDTO dto, HttpSession session) {
    String id = (String) session.getAttribute("auth");
    if (id == null) return "redirect:/page/logonMain.do";

    String kusID = userMapper.getKusIDById(id);
    dto.setKusID(kusID);

    boardService.saveBoard(dto);
    return "redirect:/board/list.do";
}

    @GetMapping("/board/edit.do")
    public String editForm(@RequestParam("brdID") int brdID, Model model) {
        BoardDTO dto = boardService.getBoardById(brdID);
        model.addAttribute("dto", dto);
        return "board.boardEdit";
    }

    @PostMapping("/board/edit.do")
    public String edit(BoardDTO dto) {
        boardService.updateBoard(dto);
        return "redirect:/board/view.do?brdID=" + dto.getBrdID();
    }

    @PostMapping("/board/delete.do")
    public String delete(@RequestParam("brdID") int brdID) {
        boardService.deleteBoard(brdID);
        return "redirect:/board/list.do";
    }

}
