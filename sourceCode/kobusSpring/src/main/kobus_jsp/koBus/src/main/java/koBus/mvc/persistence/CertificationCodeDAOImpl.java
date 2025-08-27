package koBus.mvc.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;

import koBus.mvc.domain.JoinDTO;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.response.MultipleDetailMessageSentResponse;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;



public class CertificationCodeDAOImpl implements CertificationCodeDAO{
	
	private Connection conn = null;
	private PreparedStatement pstmt = null;
	private ResultSet rs = null;
	private JoinDTO dto = null;
	
	public CertificationCodeDAOImpl() {}
	
	public CertificationCodeDAOImpl(Connection conn) {
		super();
		this.conn = conn;
	}

	// 전화번호 입력해서 인증번호받기 위해 유효성 검사한 인증번호 건네주는 함수
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

	// 회원가입한 회원정보 DB에 insert
	@Override
	public int insert(JoinDTO dto) throws SQLException {

	    String sql = "INSERT INTO kobusUser "
	               + "(kusID, tel, subEmail, id, passwd, birth, gender, rank, mil, status, joinDate) "
	               + "VALUES "
	               + "('KUS' || LPAD(kobusUser_seq.NEXTVAL, 3, '0'), ?, ?, ?, ?, TO_DATE(?, 'YYYY'), ?, '회원', 0, 'Y', TO_DATE(?, 'YYYY-MM-DD'))";

	    int rowCount = 0;

	    // 현재 날짜 yyyy-MM-dd 형식으로 포맷
	    LocalDate today = LocalDate.now();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    String formattedDate = today.format(formatter);

	    pstmt = conn.prepareStatement(sql);
	    pstmt.setString(1, dto.getTel());
	    pstmt.setString(2, dto.getSubEmail());
	    pstmt.setString(3, dto.getId());
	    pstmt.setString(4, dto.getPasswd());
	    pstmt.setString(5, dto.getBirth());

	    pstmt.setInt(6, dto.getGender());

	    // joinDate: yyyy-MM-dd 포맷된 String 넘김
	    pstmt.setString(7, formattedDate);

	    rowCount = pstmt.executeUpdate();
	    return rowCount;
	}


}
