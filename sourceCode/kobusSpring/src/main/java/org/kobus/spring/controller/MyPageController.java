package org.kobus.spring.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.kobus.spring.domain.member.ItemCanclePurDTO;
import org.kobus.spring.domain.member.ItemPurDTO;
import org.kobus.spring.service.member.MemberItemPurService;
import org.kobus.spring.service.member.MemberMyPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
public class MyPageController {
	
	@Autowired
	private MemberMyPageService memberMyPageService;
	
	@Autowired
	private MemberItemPurService memberItemPurService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@GetMapping("/page/itemPurListPage.do")
	public String itemPurListPage(
			HttpServletRequest request,
			HttpServletResponse response
			) throws SQLException {
		
		String loginId = (String)request.getSession().getAttribute("auth");
		
		List<ItemPurDTO> popItemList = memberItemPurService.itemPopPurList(loginId);
		List<ItemPurDTO> freeItemList = memberItemPurService.itemFreePurList(loginId);
		
		List<ItemCanclePurDTO> popCancleItemList = memberItemPurService.itemCanclePopPurList(loginId);
		List<ItemCanclePurDTO> freeCancleItemList = memberItemPurService.itemCancleFreePurList(loginId);
		
		request.setAttribute("popItemList", popItemList);
		request.setAttribute("freeItemList", freeItemList);
		request.setAttribute("popCancleItemList", popCancleItemList);
		request.setAttribute("freeCancleItemList", freeCancleItemList);
		
		return "kobus.mypage/itemPurListPage";
	}
	
	/* 회원탈퇴 */
	@PostMapping("/deleteUsr.do")
	public String deleteUsr(
			HttpServletRequest request,
			HttpServletResponse response,
			HttpSession session
			) throws SQLException {
		String auth = (String)session.getAttribute("auth");
		
		int result = memberMyPageService.deleteUsr(auth);
		
		if(result == 1) {
			log.info("회원탈퇴 성공");
			if(session != null) session.invalidate();
		}else {
			log.info("회원탈퇴 실패");
		}
		
		return "redirect:main.do";
	}
	
	/* 휴대폰번호 변경 */
	@PostMapping("/changePhoneNum.do")
	public String changePhoneNum(
			@RequestParam("usrHp") String usrHp,
			HttpServletRequest request,
			HttpServletResponse response	
			) throws SQLException {
		String auth = (String)request.getSession().getAttribute("auth");		
		
		int result = memberMyPageService.updateTel(auth, usrHp);
		
		if(result == 1) {
			log.info("휴대폰번호 업데이트 성공");
		}else {
			log.info("휴대폰번호 업데이트 실패");
		}
		
		return "redirect:/page/logonMyPage.do";
	}
	
	/* 비밀번호 변경 */
	@PostMapping("/changePw.do")
	public String changePw(
			@RequestParam("usrPwd") String usrPwd,
			HttpServletRequest request,
			HttpServletResponse response	
			) throws SQLException {
		String auth = (String)request.getSession().getAttribute("auth");
		
		String changePw = bCryptPasswordEncoder.encode(usrPwd);
		
		int result = memberMyPageService.updatePw(auth, changePw);
		
		if(result == 1) {
			log.info("비밀번호 업데이트 성공");
		}else {
			log.info("비밀번호 업데이트 실패");
		}
		
		return "redirect:/page/logonMyPage.do";
	}
	
	/* 바꿀 비밀번호와 현재 비밀번호가 동일한지 확인하는 ajax처리 */ 
	@GetMapping("/oldPwCheckOk.do")
	public String oldPwCheckOk(
			@RequestParam("checkPw") String checkPw,
			HttpServletRequest request,
			HttpServletResponse response
			) throws SQLException, IOException {
		String result = "";
		String auth = (String)request.getSession().getAttribute("auth");
		
		String oldpw = memberMyPageService.getOldPw(auth);
		// String inputpw = bCryptPasswordEncoder.encode(checkPw);
		log.info("입력한 비밀번호: " + checkPw);
		
		if(bCryptPasswordEncoder.matches(checkPw, oldpw)) {
			result="success";
			System.out.println(result);
			response.setContentType("text/plain; charset=UTF-8");
		    response.getWriter().write(result);
		} else {
			result="fail";
			System.out.println(result);
			response.setContentType("text/plain; charset=UTF-8");
		    response.getWriter().write(result);
		}
		
		return null;
	}
	
	// 비밀번호 바꾸는 페이지
	@GetMapping("/page/changePwPage.do")
	public String changePwPage() {
		return "kobus.mypage/changePwPage";
	}
	
	// 휴대폰번호 바꾸는 페이지
	@GetMapping("/page/changePhoneNumPage.do")
	public String changePhoneNumPage() {
		return "kobus.mypage/changePhoneNumPage";
	}
	
	// 아이디찾기 페이지 post요청
	@GetMapping("/page/logonMyPage.do")
	public String logonMyPage(
			HttpServletRequest request,
			HttpServletResponse response
			) throws SQLException {
		log.info("> logonMyPage...POST()");
		String auth = (String) request.getSession().getAttribute("auth");
		log.info("가져온 아이디값 : " + auth);
		String telNum = memberMyPageService.getTelNum(auth);
		int resvCount = memberMyPageService.reservationCount(auth);
		int couponCount = memberMyPageService.popCouponCount(auth);
		couponCount += memberMyPageService.freeCouponCount(auth);
		
		request.setAttribute("tel", telNum);
		request.setAttribute("reservationCount", resvCount);
		request.setAttribute("couponCount", couponCount);
		
		return "kobus.mypage/logonMyPage";
	}

}
