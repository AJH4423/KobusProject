package koBus.mvc.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import koBus.mvc.persistence.CertificationCodeDAO;
import koBus.mvc.persistence.CertificationCodeDAOImpl;

public class TelCertificationNumHandler implements CommandHandler {
	
	
	@Override
	public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		System.out.println("TelCertificationNumHandler start");
		
		String inputNumber = request.getParameter("phoneNum");
		System.out.println("입력받아온 번호 : " + inputNumber);
		int randonNumber = 0;
		
		CertificationCodeDAO dao = new CertificationCodeDAOImpl();

		String CertificationNum = dao.telCertificationNum(inputNumber, randonNumber);
		
		System.out.println("4자리 랜덤 숫자: " + CertificationNum);
		
		response.setContentType("text/plain; charset=UTF-8");
	    response.getWriter().write(
	        (CertificationNum != null && !CertificationNum.isEmpty()) ? CertificationNum : "error"
	    );
	    
	    return null;
	}

}
