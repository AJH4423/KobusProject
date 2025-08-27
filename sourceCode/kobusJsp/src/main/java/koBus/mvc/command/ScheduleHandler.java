package koBus.mvc.command;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.NamingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.util.ConnectionProvider;

import koBus.mvc.domain.ScheduleDTO;
import koBus.mvc.persistence.ScheduleDAO;
import koBus.mvc.persistence.ScheduleDAOImpl;


public class ScheduleHandler implements CommandHandler {
	

	/*
	 * 노선 스케줄 조회 테스트 시 사용할 데이터
	| BSHID  | 출발지 (REGID → 지역명)  | 도착지 (REGID → 지역명) | 출발일자       | 버스등급 |
	| ------ | ------------------ | ----------------- | ---------- | ---- |
	| BSH011 | 수원 (REG010)        | 동서울 (REG001)      | 2025-06-25 | 일반   |
	| BSH012 | 수원 (REG010)        | 동서울 (REG001)      | 2025-06-25 | 프리미엄 |
	| BSH013 | 수원 (REG010)        | 동서울 (REG001)      | 2025-06-25 | 우등   |
	| BSH014 | 서울 경부 (REG002)     | 인천 (REG006)       | 2025-06-26 | 일반   |
	| BSH015 | 서울 경부 (REG002)     | 인천 (REG006)       | 2025-06-26 | 일반   |
	| BSH016 | 서울 경부 (REG002)     | 인천 (REG006)       | 2025-06-26 | 일반   |
	| BSH017 | 센트럴시티 (REG003)     | 인천공항 (REG007)     | 2025-06-27 | 우등   |
	| BSH018 | 센트럴시티 (REG003)     | 인천공항 (REG007)     | 2025-06-27 | 프리미엄 |
	| BSH019 | 센트럴시티 (REG003)     | 인천공항 (REG007)     | 2025-06-27 | 우등   |
	| BSH020 | 서울남부터미널 (REG004)   | 안산 (REG008)       | 2025-06-28 | 일반   |
	| BSH021 | 서울남부터미널 (REG004)   | 안산 (REG008)       | 2025-06-28 | 일반   |
	| BSH022 | 강남고속버스터미널 (REG005) | 성남 (REG009)       | 2025-06-29 | 프리미엄 |
	| BSH023 | 강남고속버스터미널 (REG005) | 성남 (REG009)       | 2025-06-29 | 우등   |
	| BSH024 | 강남고속버스터미널 (REG005) | 성남 (REG009)       | 2025-06-29 | 일반   |
	| BSH025 | 인천 (REG006)        | 인천공항 (REG007)     | 2025-06-30 | 일반   |
	| BSH026 | 인천 (REG006)        | 인천공항 (REG007)     | 2025-06-30 | 일반   |
	| BSH027 | 인천 (REG006)        | 인천공항 (REG007)     | 2025-06-30 | 우등   |

	 */

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response) throws Exception {
		System.out.println("> StationHandler.process() ...");
		request.setCharacterEncoding("UTF-8");
		response.setContentType("application/json; charset=UTF-8");

		String regionCode = request.getParameter("regionCode");
		int sidoCode = 11;
		List<ScheduleDTO> regionList = null;
		List<ScheduleDTO> schList = null;
		StringBuilder jsonBuilder = new StringBuilder();
		String sourcePage = request.getParameter("sourcePage");
		
		System.out.println("sourcePage : " + sourcePage);

		
		try(Connection conn = ConnectionProvider.getConnection();){
			ScheduleDAO dao = new ScheduleDAOImpl(conn);
			
			String ajax = request.getParameter("ajax");
			String ajaxType = request.getParameter("ajaxType");

			System.out.println("ajax = " + ajax);
			System.out.println("ajaxType = " + ajaxType);

			if ("true".equalsIgnoreCase(ajax) && ajaxType.equals("getStationName")) {
				
				if (regionCode == null || regionCode.trim().isEmpty() || 
						regionCode.equalsIgnoreCase("null") || 
						regionCode.equalsIgnoreCase("undefined")) {
					regionCode = "11";
					regionList = dao.selectBySidoCode(sidoCode);
				}else if(regionCode.equals("all")) {
					regionList = dao.selectByRegion();
				}

				else {
					sidoCode = Integer.parseInt(regionCode);
					regionList = dao.selectBySidoCode(sidoCode);
				}
				
				Gson gson = new Gson();
				String json = gson.toJson(regionList);

				PrintWriter out = response.getWriter();
				out.write(json);
				out.close();
				// forward 하지 않음
				return null;

			}else if ("true".equalsIgnoreCase(ajax) && "searchSch".equals(ajaxType)) {

			    String deprCd = request.getParameter("deprCd");
			    String arvlCd = request.getParameter("arvlCd");
			    String deprDtm = request.getParameter("deprDtm");
			    String busClsCd = request.getParameter("busClsCd");

			    switch (busClsCd) {
			        case "0": busClsCd = "전체"; break;
			        case "7": busClsCd = "프리미엄"; break;
			        case "1": busClsCd = "우등"; break;
			        case "2": busClsCd = "일반"; break;
			        default: break;
			    }
			    
			    System.out.println("deprDtm " + deprDtm);

			    schList = dao.searchBusSchedule(deprCd, arvlCd, deprDtm, busClsCd);

			    int durmin = 0;
			    if (!schList.isEmpty()) {
			        durmin = schList.get(0).getDurMin();
			    }

			    System.out.println("schList.size() : " + schList.size());

			    // ✅ Gson으로 응답을 만들기 위한 구조 정의
			    Map<String, Object> responseMap = new HashMap<>();
			    responseMap.put("rotVldChc", schList.isEmpty() ? "N" : "Y");

			    Map<String, Object> alcnCmnMap = new HashMap<>();
			    alcnCmnMap.put("takeDrtm", durmin);
			    responseMap.put("alcnCmnMap", alcnCmnMap);

			    List<Map<String, Object>> alcnAllList = new ArrayList<>();

			    for (ScheduleDTO dto : schList) {
			        Map<String, Object> scheduleMap = new HashMap<>();
			        LocalDateTime departureDate = dto.getDepartureDate();
			        String time = departureDate.toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm"));

			        scheduleMap.put("DEPR_TIME_DVS", time);
			        scheduleMap.put("CACM_MN", dto.getComName());
			        scheduleMap.put("BUS_CLS_NM", dto.getBusGrade());
			        scheduleMap.put("ADLT_FEE", dto.getAdultFare());
			        scheduleMap.put("CHLD_FEE", dto.getStuFare());
			        scheduleMap.put("TEEN_FEE", dto.getChildFare());
			        scheduleMap.put("RMN_SATS_NUM", dto.getRemainSeats());
			        scheduleMap.put("TOT_SATS_NUM", dto.getBusSeats());

			        alcnAllList.add(scheduleMap);
			    }

			    responseMap.put("alcnAllList", alcnAllList);

			    Gson gson = new Gson();
			    String json = gson.toJson(responseMap);

			    PrintWriter out = response.getWriter();
			    out.write(json);
			    out.flush();
			    out.close();

			    return null;
			}
			
			// ==============================
			else if ("getDuration".equals(ajaxType)) {
			    String deprCd = request.getParameter("deprCd");
			    String arvlCd = request.getParameter("arvlCd");
			    
			    System.out.println("[getDuration] 출발지 REGID: " + deprCd);
			    System.out.println("[getDuration] 도착지 REGID: " + arvlCd);

			    int duration = 0;

			    try {
			      
			    	duration = dao.getDurationFromRoute(deprCd, arvlCd);  
			    	
			    	System.out.println("[getDuration] 조회된 duration: " + duration);
			    	
			    } catch (Exception e) {
			        e.printStackTrace();
			    }

			    Map<String, Integer> result = new HashMap<>();
			    result.put("duration", duration);

			    String json = new Gson().toJson(result);
			    PrintWriter out = response.getWriter();
			    out.print(json);
			    out.flush();

			    return null;
			}

			// ==============================


		}catch (NamingException e) {
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

		request.setAttribute("regionList", regionList);
		
		if ("KOBUSreservation3.jsp".equals(sourcePage) || "kobus_main.jsp".equals(sourcePage)) {
		    return "/koBusFile/KOBUSreservation2.jsp";
		} else if("kobusModifyResv.jsp".equals(sourcePage)) {
			return "/koBusFile/kobusModifyResvSch.jsp";
		} else if("kobusModifyResvSch.jsp".equals(sourcePage)) {
			return "/koBusFile/kobusModifyResvSeat.jsp";
		}
		else  {
			return "/koBusFile/kobusSchedule.jsp";
		    
		}

	}

}