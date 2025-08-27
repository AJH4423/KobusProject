package koBus.mvc.command;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.naming.NamingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.util.ConnectionProvider;

import koBus.mvc.domain.ResvDTO;
import koBus.mvc.domain.ScheduleDTO;
import koBus.mvc.domain.SeatDTO;
import koBus.mvc.persistence.ScheduleDAO;
import koBus.mvc.persistence.ScheduleDAOImpl;
import koBus.mvc.persistence.SeatDAO;
import koBus.mvc.persistence.SeatDAOImpl;

public class SeatHandler implements CommandHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("> SeatHandler.process() ...");
		/* String busId = request.getParameter("BUSID"); */
		String deprId = request.getParameter("deprCd");  /*출발지(수원)*/
		String arrId = request.getParameter("arvlCd"); /*도착지(동서울)*/
	    String deprDtm = request.getParameter("deprDtm") + " " + request.getParameter("deprTime");
	    String busClsCd = request.getParameter("busClsCd");
	    String deprDate = request.getParameter("deprDtm");
	    String deprTime = request.getParameter("deprTime");
	    String deprNm = request.getParameter("deprNm");
	    String arvlNm = request.getParameter("arvlNm");
	    
	    System.out.println(">>> deprTime" + deprTime);
	    
	    switch (busClsCd) {
		    case "0": busClsCd = "전체"; break;
		    case "7": busClsCd = "프리미엄"; break;
		    case "1": busClsCd = "우등"; break;
		    case "2": busClsCd = "일반"; break;
		    default: break;
	    }
	    
	    
	    String sourcePage = request.getParameter("sourcePage");
	    System.out.println("sourcePage " + sourcePage);
	    
	    String resId = null;
	    
	    if ("kobusModifyResvSch.jsp".equals(sourcePage)) {
	    	
	    	
	    	LocalDateTime loc = LocalDateTime.parse(deprDate);
		    DateTimeFormatter oracleFormatter = DateTimeFormatter.ofPattern("yyyyMMdd HH:mm:ss");
		    deprDtm = loc.format(oracleFormatter);
		    
		    resId = request.getParameter("mrsMrnpNo");
	    	String deprName = request.getParameter("deprNm");
	    	String arrvName = request.getParameter("arvlNm");
	    	String durMin = request.getParameter("takeDrtm");
	    	String comName = request.getParameter("comName");
	    	String aduCount = request.getParameter("adltNum");
	    	String stuCount = request.getParameter("chldNum");
	    	String chdCount = request.getParameter("teenNum");


	    	int durMinInt = Integer.parseInt(durMin);
	    	int aduCountInt = Integer.parseInt(aduCount);
	    	int stuCountInt = Integer.parseInt(stuCount);
	    	int chdCountInt = Integer.parseInt(chdCount);
	    	
	    	
	    	

	    	// ResvDTO 객체 생성
	    	ResvDTO changeSeat = ResvDTO.builder()
	    			.resId(resId)
	    	        .deprRegCode(deprId)
	    	        .deprRegName(deprName)
	    	        .arrRegCode(arrId)
	    	        .arrRegName(arrvName)
	    	        .comName(comName)
	    	        .busGrade("")          // 필요시 추가
	    	        .rideDateStr(deprDtm)
	    	        .durMin(durMinInt)
	    	        .aduCount(aduCountInt)
	    	        .stuCount(stuCountInt)
	    	        .chdCount(chdCountInt)
	    	        .build();

	    	// 리스트에 담아 request에 저장
	    	List<ResvDTO> changeSeatList = new ArrayList<>();
	    	changeSeatList.add(changeSeat);

	    	request.setAttribute("changeSeatList", changeSeatList);
	    } 
	    
	    
	    
	    int totalSeat = 0;
	    List<SeatDTO> seatList = null;
	    List<ScheduleDTO> busList = null;
	    
	    
	    try {
			Connection conn = ConnectionProvider.getConnection();
			SeatDAO dao = new SeatDAOImpl(conn);
			ScheduleDAO schDAO = new ScheduleDAOImpl(conn);
			
			
			if("KOBUSreservation2.jsp".equals(sourcePage) || "kobusModifyResvSch.jsp".equals(sourcePage)) {
				
				System.out.println("deprDtm " + deprDtm);
				
				if (deprDtm.matches("\\d{8} \\d{2}:\\d{2}:\\d{2}")) {
				    // 예: "20250628 08:00:00"
				    String date = deprDtm.substring(0, 8); // "20250628"
				    String time = deprDtm.substring(9, 14); // "08:00"

				    // "2025-06-28 08:00"
				    deprDtm = date.substring(0, 4) + "-" + 
				              date.substring(4, 6) + "-" + 
				              date.substring(6, 8) + " " + time;
				}

				
//			출발지 / 도착지 / 출발시간 / 버스등급을 기준으로 사용하는 busId 가져오기
				String busId = dao.getBusId(deprId, arrId, deprDtm);
				
				// 탑승하는 버스 전체 좌석 가져오기
				totalSeat = dao.getTotalSeats(busId);
				
				// 탑승하는 버스 좌석 정보 가져오기
				seatList = dao.searchSeat(busId);
				
		    	
		    }
			
			
			// 탑승하는 버스 스케줄 정보 가져오기
			busList = schDAO.searchBusSchedule(deprId, arrId, deprDtm, busClsCd);
			
			
			
			String ajax = request.getParameter("ajax");
			
			System.out.println("ajax : " + ajax);

	     
	        if ("true".equalsIgnoreCase(ajax)) {
//	   	        String deprCd = request.getParameter("deprCd");           // 출발지 코드
//	   	        String arvlCd = request.getParameter("arvlCd");           // 도착지 코드
//	   	        String deprDt = request.getParameter("deprDt");           // 출발일자
//	   	        String deprTime = request.getParameter("deprTime");       // 출발시간
//	   	        
//	   	        String selSeatCnt = request.getParameter("selSeatCnt");   // 총 좌석 수
//	   	        String selAdltCnt = request.getParameter("selAdltCnt");   // 일반인 수
//	   	        String selTeenCnt = request.getParameter("selTeenCnt");   // 중고생 수
//	   	        String selChldCnt = request.getParameter("selChldCnt");   // 초등학생 수
//	   	        
//	   	        String adltTotPrice = request.getParameter("adltTotPrice");      //일반금액
//	   	        String chldTotPrice = request.getParameter("chldTotPrice");         //중고생금액
//	   	        String teenTotPrice = request.getParameter("teenTotPrice");         //초등생금액
//	   	        String allTotAmtPrice = request.getParameter("allTotAmtPrice");   //결제금액
//	   	        
//	   	        
//	   	        System.out.printf(
//	   	        	    "출발지 코드: %s, 도착지 코드: %s, 출발일자: %s, 출발시간: %s%n" +
//	   	        	    "총 좌석 수: %s, 일반인 수: %s, 중고생 수: %s%n" +
//	   	        	    "초등학생 수: %s, 경로자 수: %s, 장애인 수: %s%n" +
//	   	        	    "일반금액: %s, 중고생금액: %s, 초등생금액: %s, 예상 운임 금액: %s%n",
//	   	        	    deprCd, arvlCd, deprDt, deprTime,
//	   	        	    selSeatCnt, selAdltCnt, selTeenCnt,
//	   	        	    selChldCnt, 
//	   	        	    adltTotPrice, chldTotPrice, teenTotPrice, allTotAmtPrice
//	   	        	);
	        	
				// Ajax 요청인 경우 JSON 응답 전송
				response.setContentType("application/json;charset=utf-8");
				PrintWriter out = response.getWriter();
				out.print("{\"result\":\"ok\"}");
				out.close();
				// forward 하지 않음
				return null;
			}
			
		} catch (NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	    catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    
	    request.setAttribute("deprId", deprId);
	    request.setAttribute("arrId", arrId);
	    request.setAttribute("deprDtm", deprDtm);
	    request.setAttribute("deptTime", deprTime);
	    request.setAttribute("busClsCd", busClsCd);
	    request.setAttribute("deprDate", deprDate);
	    request.setAttribute("deprTime", deprTime);
	    request.setAttribute("deprNm", deprNm);
	    request.setAttribute("arvlNm", arvlNm);
	    request.setAttribute("totalSeat", totalSeat);
	    request.setAttribute("seatList", seatList);
	    request.setAttribute("busList", busList);
	    request.setAttribute("resId", resId);
	    
	    System.out.println("resId : " + resId);
	    
	    if ("kobusModifyResvSch.jsp".equals(sourcePage)) {
	    	return "/koBusFile/kobusModifyResvSeat.jsp";
		}else if("KOBUSreservation2.jsp".equals(sourcePage)){
			return "/koBusFile/kobus_seat.jsp";
			
		}else {
			return "kobus_pay.jsp";
		}
		
	}

    
}
