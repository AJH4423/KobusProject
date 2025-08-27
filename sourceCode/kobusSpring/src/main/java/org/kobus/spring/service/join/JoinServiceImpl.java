package org.kobus.spring.service.join;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.kobus.spring.domain.join.AuthDTO;
import org.kobus.spring.domain.join.JoinDTO;
import org.kobus.spring.mapper.join.JoinMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.response.MultipleDetailMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Service
public class JoinServiceImpl implements JoinService{
	
	@Autowired
    private JoinMapper joinMapper;
	
	// 인증번호 받기 ajax
	@Override
	public String telCertificationNum(String inputNumber, int randomNumber) throws SQLException {
		
		randomNumber = (int)((Math.random()*(9999-1000+1)) + 1000);
		String strRandomNumber = Integer.toString(randomNumber);
		
		String api_key = "NCSWFQ7FIGQ6B1L9";
	    String api_secret = "YTRCYGZJY5XDJNBW9LMBZQKDIAK72EBM";
	    DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(
	    		api_key,
	    		api_secret,
	            "https://api.coolsms.co.kr"
	        );
	    
	    Message message = new Message();
        message.setFrom("01044232801");  // 사전에 등록된 번호
        message.setTo(inputNumber);    // 예: 01012345678
        message.setText("[코드] 인증번호는 ["+ strRandomNumber +"] 입니다.");
        
        try {
            MultipleDetailMessageSentResponse response = messageService.send(message);
            System.out.println(response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return strRandomNumber;
	}
	
	// 입력한 회원정보 kobusUser테이블에 넣기
	@Override
	public int insert(JoinDTO dto) throws SQLException {
		
		// 날짜 설정
		LocalDate today = LocalDate.now();
        String formattedDate = today.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        
	    dto.setJoinDate(formattedDate);
	    // security 설정후 비밀번호 인코딩 한뒤에 저장시키기
		
		return joinMapper.insert(dto);
	}
	
	// 입력정보 kouserAuthorities테이블에 넣기 
	@Override
	public int insertAuth(AuthDTO dto) throws SQLException {
		
		return joinMapper.insertAuth(dto);
	}
	
	// 아이디 중복확인 ajax
	@Override
	public String idDupCheck(String inputId) throws SQLException {
		
		return joinMapper.idDupCheck(inputId);
	}

}
