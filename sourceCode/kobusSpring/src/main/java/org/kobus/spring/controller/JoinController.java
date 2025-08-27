package org.kobus.spring.controller;

import java.io.IOException;
import java.net.http.HttpResponse;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.annotations.Param;
import org.kobus.spring.domain.join.AuthDTO;
import org.kobus.spring.domain.join.JoinDTO;
import org.kobus.spring.domain.reservation.ResvDTO;
import org.kobus.spring.service.join.JoinService;
import org.kobus.spring.service.reservation.ResvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
public class JoinController {
	
	@Autowired
	private JoinService joinService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	ResvService resvService;
	
	/* 메인페이지 예매내역 뿌려주는 ajax처리 */
	@GetMapping("/mainPageResv.do")
	public String mainPageResv(
				HttpServletRequest request,
				HttpServletResponse response
			) throws SQLException, IOException {
		
		String auth = (String)request.getSession().getAttribute("auth");
		
		List<ResvDTO> resvList = resvService.searchResvList(auth); 
		
		request.setAttribute("resvList", resvList);
		
		response.setContentType("application/json; charset=UTF-8");
        
        Gson gson = new Gson();
        String json = gson.toJson(resvList); // Java 객체 → JSON 문자열로 변환 
        System.out.println("받아온 객체 값들 json 문자열로 변환");
        System.out.println(json);
         
        response.getWriter().write(json);
		
		return null;
	}
	
	@GetMapping("/usrIdDupCheck.do")
	@ResponseBody
	public String usrIdDupCheck(
				@RequestParam("checkid") String inputId,
				HttpServletResponse response
			) throws SQLException, IOException {
		
		String result = "";
		
		String inputidOk = joinService.idDupCheck(inputId);
		
		if(inputidOk != null && !inputidOk.isEmpty()) {
			result = "success";
			log.info("아이디 정보가 존재합니다.");
			response.setContentType("text/plain; charset=UTF-8");
		    response.getWriter().write(result);
		} else {
			log.info("아이디 사용가능");
			response.setContentType("text/plain; charset=UTF-8");
		    response.getWriter().write(
		        (result != null && !result.isEmpty()) ? result : "error"
		    );
		}
	
		return null;
	}
	
	// 
	@GetMapping("/telCertificationNum.do")
	@ResponseBody
	public String telCertificationNum(
				@RequestParam("phoneNum") String inputNumber,
				HttpServletResponse response
			) throws SQLException, IOException {
		
		String result = "";
		
		int randomNumber = 0;
		
		String CertificationNum = joinService.telCertificationNum(inputNumber, randomNumber);
		
		log.info("4자리 랜덤 숫자: " + CertificationNum);
		
		response.setContentType("text/plain; charset=UTF-8");
	    response.getWriter().write(
	        (CertificationNum != null && !CertificationNum.isEmpty()) ? CertificationNum : "error"
	    );
		
		return null;
	}
	
	@PostMapping("/joinOkEnterInfo.do")
	public String joinOkEnterInfo(
			@ModelAttribute JoinDTO dto
			) throws SQLException {
		
		log.info("> joinOkEnterInfo.POST()...");
		
		dto.setPasswd(bCryptPasswordEncoder.encode(dto.getPasswd()));
		AuthDTO adto = new AuthDTO();
		
		int result = joinService.insert(dto);
		adto.setUsername(dto.getId());
		int result2 = joinService.insertAuth(adto);
		
		if(result == 1 && result2 == 1) {
			log.info("회원가입 성공!");
			
		}else {
			log.info("회원가입 실패!");
			
		}
		
		return "redirect:main.do";
		
	}

	// 회원가입 main페이지 get방식
	@GetMapping("/page/joinMain.do")
	public String joinMainPage() {
		return "kobus.join/joinMain";
	}

	// 회원가입 인증번호받는 페이지 get방식
	@GetMapping("/page/joinVerification.do")
	public String joinVerificationPage() {
		return "kobus.join/joinVerification";
	}

	// 회원가입 정보입력페이지 get방식
	@GetMapping("/page/joinEnterInfo.do")
	public String joinEnterInfoPage() {
		return "kobus.join/joinEnterInfo";
	}

}
