package koBus.mvc.command;

import java.io.IOException;
import java.sql.Connection;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.util.ConnectionProvider;

import koBus.mvc.domain.ResvDTO;
import koBus.mvc.domain.ScheduleDTO;
import koBus.mvc.persistence.ScheduleDAO;
import koBus.mvc.persistence.ScheduleDAOImpl;

public class ModifyResvHandlerSch implements CommandHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, Exception, Throwable {
		
		System.out.println("ModifyResvHandlerSch process.. ");
		
		Connection conn = ConnectionProvider.getConnection();
	    ScheduleDAO dao = new ScheduleDAOImpl(conn);
		
		List<ResvDTO> resvInfoList = new ArrayList<ResvDTO>();
		List<ScheduleDTO> changeList = new ArrayList<ScheduleDTO>();
		
		String resId = request.getParameter("mrsMrnpNo");          // resv.resId
		String deprRegCode = request.getParameter("deprnCd");              // resv.deprRegName
		String deprRegName = request.getParameter("deprnNm");              // resv.deprRegName
		String arrRegCode = request.getParameter("arvlCd");                // resv.arrRegName
		String arrRegName = request.getParameter("arvlNm");                // resv.arrRegName
		String durMin = request.getParameter("takeDrtm");            // resv.durMin
		String busGrade = request.getParameter("deprCd");                // resv.busGrade

		String deprDay = request.getParameter("DEPR_DT");              // fn:substringBefore(resv.rideDateStr, ' ')
		String deprTime = request.getParameter("deprTime");            // fn:substringAfter(resv.rideDateStr, ' ')

		String amount = request.getParameter("tissuFee");            // resv.amount
		String payType = request.getParameter("pynDvsCd");            // resv.payType
		String adultCnt = request.getParameter("adltNum");
		String stuCnt = request.getParameter("chldNum");
		String childCnt = request.getParameter("teenNum");
		
		

		
		

		// 날짜 + 시간 조합 문자열 → 포맷된 탑승일 문자열로 사용
		String rideDateStr = deprDay + " " + deprTime;

		// rideDateStr → LocalDateTime 변환 (필요 시 예외 처리 포함)
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime rideDate = LocalDateTime.parse(rideDateStr, formatter);

		// 문자열 숫자값들 → int 로 변환 (null 또는 빈 문자열 체크 포함)
		int durMinInt = durMin != null && !durMin.isEmpty() ? Integer.parseInt(durMin) : 0;
		int amountInt = amount != null && !amount.isEmpty() ? Integer.parseInt(amount) : 0;
		int aduCountInt = adultCnt != null && !adultCnt.isEmpty() ? Integer.parseInt(adultCnt) : 0;
		int stuCountInt = stuCnt != null && !stuCnt.isEmpty() ? Integer.parseInt(stuCnt) : 0;
		int chdCountInt = childCnt != null && !childCnt.isEmpty() ? Integer.parseInt(childCnt) : 0;
		int totalCount = aduCountInt + stuCountInt + chdCountInt;

		// DTO 생성
		ResvDTO dto = ResvDTO.builder()
		        .resId(resId)
		        .rideDate(rideDate)
		        .rideDateStr(rideDateStr)
		        .deprRegCode(deprRegCode)
		        .deprRegName(deprRegName)
		        .arrRegCode(arrRegCode)
		        .arrRegName(arrRegName)
		        .busGrade(busGrade)
		        .durMin(durMinInt)
		        .amount(amountInt)
		        .payMethod(payType)
		        .aduCount(aduCountInt)
		        .stuCount(stuCountInt)
		        .chdCount(chdCountInt)
		        .totalCount(totalCount)
		        .build();

		
		resvInfoList.add(dto);
		
		
		if (deprDay != null && deprDay.matches("\\d{4}-\\d{2}-\\d{2}")) {
			deprDay = deprDay.replace("-", "");
		} else {
		    System.out.println("입력 형식이 올바르지 않습니다.");
		}
		
	    changeList = dao.searchBusSchedule(deprRegCode, arrRegCode, deprDay, busGrade);		
		

//		System.out.printf(
//			    "resId=%s, deprRegCode=%s, deprRegName=%s, arrRegCode=%s, arrRegName=%s, durMin=%s, busGrade=%s, deprDay=%s, deprTime=%s, amount=%s, payType=%s%n",
//			    resId, deprRegCode, deprRegName, arrRegCode, arrRegName, durMin, busGrade, deprDay, deprTime, amount, payType
//			);

	    request.setAttribute("changeList", changeList);
		request.setAttribute("resvInfoList", resvInfoList);
		
		return "/koBusFile/kobusModifyResvSch.jsp";
	}

}
