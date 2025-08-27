package org.kobus.spring.controller;

import java.security.Principal;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.aspectj.apache.bcel.classfile.Module.Require;
import org.kobus.spring.domain.reservation.ModifyResvDTO;
import org.kobus.spring.domain.reservation.ResvDTO;
import org.kobus.spring.domain.reservation.SeatDTO;
import org.kobus.spring.domain.schedule.ScheduleDTO;
import org.kobus.spring.mapper.pay.BusReservationMapper;
import org.kobus.spring.service.reservation.ResvService;
import org.kobus.spring.service.reservation.SeatService;
import org.kobus.spring.service.schedule.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
public class ModifyReservationController {
	
	
	@Autowired
	SeatService seatService;
	
	@Autowired
	ResvService resvService;
	
	@Autowired
	ScheduleService scheduleService;
	
	@Autowired
    private BusReservationMapper busReservationMapper;
	
	@GetMapping("/manageReservations.do")
	public String manageReservations(HttpSession session, Model model, Principal principal) {
		
		String loginId = principal.getName();

		try {
			// 예매 내역 조회
			List<ResvDTO> resvList = resvService.searchResvList(loginId);
			List<ResvDTO> cancelList = resvService.searchCancelResvList(loginId);
			
			model.addAttribute("resvList", resvList);
			model.addAttribute("cancelList", cancelList);
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "kobus.reservation/kobusManageResv";
	}
	
	
	
	
	
	@PostMapping("/modifyReservations.do")
	public String modifyReservations(Model model, @ModelAttribute ResvDTO resvDTO ) throws SQLException {
		
		
		String deprDay = resvDTO.getRideDateStr();              // fn:substringBefore(resv.rideDateStr, ' ')
		String deprTime = resvDTO.getRideTimeStr();            // fn:substringAfter(resv.rideDateStr, ' ')

		int adultCnt = resvDTO.getAduCount();
		int stuCnt = resvDTO.getStuCount();
		int childCnt = resvDTO.getChdCount();
		
		// 날짜 + 시간 조합 문자열 -> 포맷된 탑승일 문자열로 사용
		String rideDateStr = deprDay + " " + deprTime;
		int totalCount = adultCnt + stuCnt + childCnt;
		
		// rideDateStr -> LocalDateTime 변환
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime rideDate = LocalDateTime.parse(rideDateStr, formatter);
		String formatted = rideDate.format(outputFormatter);
		
		resvDTO.setRideDateStr(formatted);
		resvDTO.setTotalCount(totalCount);
		resvDTO.setAduCount(adultCnt);
		resvDTO.setStuCount(stuCnt);
		resvDTO.setChdCount(childCnt);
		
		
		List<ResvDTO> resvInfoList = new ArrayList<ResvDTO>();
		resvInfoList.add(resvDTO);
		
		List<ScheduleDTO> changeList = new ArrayList<ScheduleDTO>();
		
		
		String deprDay2 = deprDay.replace("-", "");
		
		
		changeList = scheduleService.searchBusSchedule(resvDTO.getDeprRegCode(), resvDTO.getArrRegCode(), deprDay2, "전체");	

		
		List<String> busTimeList = new ArrayList<>();

		for (ScheduleDTO time : changeList) {
		    LocalDateTime date = time.getDepartureDate();
		    String busTime = date.format(DateTimeFormatter.ofPattern("HH:mm"));
		    busTimeList.add(busTime);  // 리스트에 추가
		}
		

		model.addAttribute("busTimeList", busTimeList);
		model.addAttribute("resvInfoList", resvInfoList);
		
		return "kobus.reservation/kobusModifyResv";
	}
	
	@PostMapping("/modifyResvSch.do")
	public String modifyResvSch(Model model, @ModelAttribute ResvDTO resvDTO) throws SQLException {
		
		String deprDay = resvDTO.getRideDateStr();
		String deprTime = resvDTO.getRideTimeStr();

		int adultCnt = resvDTO.getAduCount();
		int stuCnt = resvDTO.getStuCount();
		int childCnt = resvDTO.getChdCount();
		
		System.out.printf("totalCount : %d / %d / %d\n", adultCnt, stuCnt, childCnt);
		
		// 날짜 + 시간 조합 문자열 -> 포맷된 탑승일 문자열로 사용
		String rideDateStr = deprDay + " " + deprTime;
		int totalCount = adultCnt + stuCnt + childCnt;
		
		// rideDateStr -> LocalDateTime 변환
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime rideDate = LocalDateTime.parse(rideDateStr, formatter);
		
		resvDTO.setRideDate(rideDate);
		resvDTO.setTotalCount(totalCount);
		resvDTO.setAduCount(adultCnt);
		resvDTO.setStuCount(stuCnt);
		resvDTO.setChdCount(childCnt);
		
		
		List<ResvDTO> resvInfoList = new ArrayList<ResvDTO>();
		resvInfoList.add(resvDTO);
		
		List<ScheduleDTO> changeList = new ArrayList<ScheduleDTO>();
		
		if (deprDay != null && deprDay.matches("\\d{4}-\\d{2}-\\d{2}")) {
			deprDay = deprDay.replace("-", "");
		}
		
	    changeList = scheduleService.searchBusSchedule(resvDTO.getDeprRegCode(), resvDTO.getArrRegCode(), deprDay, "전체");	
	    
	    model.addAttribute("changeList", changeList);
		model.addAttribute("resvInfoList", resvInfoList);
		
		return "kobus.reservation/kobusModifyResvSch";
	}
	
	@PostMapping("/modifyResvSeat.do")
	public String modifyResvSeat(Model model, 
			@ModelAttribute ResvDTO resvDTO,
		    @RequestParam("deprDtm") String deprDate,
		    @RequestParam("comName") String comName,
		    @RequestParam("busGrade") String busGrade,
		    @RequestParam("remainSeats") String remainSeats
		    ) throws SQLException {

		
		LocalDateTime loc = LocalDateTime.parse(deprDate);
	    DateTimeFormatter oracleFormatter = DateTimeFormatter.ofPattern("yyyyMMdd HH:mm:ss");
	    deprDate = loc.format(oracleFormatter);
		if (deprDate.matches("\\d{8} \\d{2}:\\d{2}:\\d{2}")) {
		    // 예: "20250628 08:00:00"
		    String date = deprDate.substring(0, 8); // "20250628"
		    String time = deprDate.substring(9, 14); // "08:00"

		    // "20250628 08:00"
		    deprDate = date + " " + time;
		}
		
		
			// 출발지 / 도착지 / 출발시간 / 버스등급을 기준으로 사용하는 busId 가져오기
			String busId = seatService.getBusId(resvDTO.getDeprRegCode(), resvDTO.getArrRegCode(), deprDate);
			
			// 탑승하는 버스 전체 좌석 가져오기
			int totalSeat = seatService.getTotalSeats(busId);
			
			// 탑승하는 버스 좌석 정보 가져오기
			List<SeatDTO> seatList = seatService.searchSeat(busId);
			
			// 탑승하는 버스 스케줄 정보 가져오기
			List<ScheduleDTO> busList = scheduleService.searchBusSchedule(resvDTO.getDeprRegCode(), resvDTO.getArrRegCode(), deprDate, busGrade);
			
			deprDate = deprDate.substring(0, 4) + "-" + 
					deprDate.substring(4, 6) + "-" + 
					deprDate.substring(6, 8) + " " + deprDate.substring(9, 14);
			
			resvDTO.setRideDateStr(deprDate);
			resvDTO.setRideTimeStr(deprDate.substring(9, 14));
			resvDTO.setBusGrade(busGrade);
			
		
    	
    	// 리스트에 담아 request에 저장
    	List<ResvDTO> changeSeatList = new ArrayList<ResvDTO>();
    	changeSeatList.add(resvDTO);

    	model.addAttribute("changeSeatList", changeSeatList);
    	model.addAttribute("busList", busList);
    	model.addAttribute("seatList", seatList);
    	
		
    	return "kobus.reservation/kobusModifyResvSeat";
		
	}
	
	@PostMapping(value = "/setPcpy.ajax", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public ResponseEntity<?> setPcpy(
			@RequestParam Map<String, String> paramMap, 
			@ModelAttribute ModifyResvDTO modifyResvDTO, 
			HttpSession session) {

	    // 1) 파라미터 확인
	    String selectedSeatIds = paramMap.get("selectedSeatIds");
	    String ajaxType = paramMap.get("ajaxType");
	    System.out.println("선택 좌석: " + selectedSeatIds);
	    
	    System.out.println("getDeprDtm: " + paramMap.get("deprDtm"));
	    System.out.println("getArvlDtm: " + paramMap.get("arvlDtm"));
	    System.out.println("getBusClsCd: " + paramMap.get("busClsCd"));
	    System.out.println("mrsMrnpNo: " + paramMap.get("mrsMrnpNo"));
	    
	    System.out.println("deprDtm " + paramMap.get("deprDtm"));
	    System.out.println("deprDtmAll " + paramMap.get("deprDtmAll"));
	    System.out.println("arvlDtm " + paramMap.get("arvlDtm"));
	    System.out.println("arvlDtmAll " + paramMap.get("arvlDtmAll"));
	    

	    // 2) 선점 로직 예시 (DB 처리나 세션에 저장)
	    modifyResvDTO.setSelectedSeatIds(selectedSeatIds);

	    // 3) 결과 리턴 (성공 JSON)
	    Map<String, Object> result = new HashMap<>();
	    result.put("result", "success");
	    result.put("message", "좌석 선점 성공");

	    return ResponseEntity.ok(result);
	}
	
	
	
	
	@PostMapping(value = "/kobusResvCancel.ajax", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE
	})
	@ResponseBody
	public ResponseEntity<Map<String, Object>> resvCancel(
			@RequestParam(required = false) String ajaxType,
			@RequestParam(required = false) String mrsMrnpno,
			@RequestParam(required = false) String mrsMrnpSno,
			@RequestParam(required = false) String prmmDcDvsCd,
			@RequestParam(required = false) String rtrpMrsYn,
			@RequestParam(required = false) String BRKP_AMT_CMM,
			@RequestParam(required = false) String pynDvsCd,
			@RequestParam(required = false) String pynDtlCd,
			@RequestParam(required = false) String tckSeqList,
			@RequestParam(required = false) String cancCnt,
			@RequestParam(required = false) String TRD_DTM,
			@RequestParam(required = false) String alcnDeprDt,
			@RequestParam(required = false) String alcnDeprTime,
			@RequestParam(required = false) String deprnNm,
			@RequestParam(required = false) String arvlNm,
			@RequestParam(required = false) String takeDrtm,
			@RequestParam(required = false) String cacmNm,
			@RequestParam(required = false) String deprNm,
			@RequestParam(required = false) String adltNum,
			@RequestParam(required = false) String chldNum,
			@RequestParam(required = false) String teenNum,
			@RequestParam(required = false) String seatNo) {

		Map<String, Object> recpListMap = new HashMap<>();

		int cancelResult = 0;
		int changeRemainSeats = 0;

		try {
			recpListMap.put("mrsMrnpNo", mrsMrnpno);
			recpListMap.put("mrsMrnpSno", mrsMrnpSno);
			recpListMap.put("prmmDcDvsCd", prmmDcDvsCd);
			recpListMap.put("rtrpMrsYn", rtrpMrsYn);
			recpListMap.put("BRKP_AMT_CMM", BRKP_AMT_CMM);
			recpListMap.put("pynDvsCd", pynDvsCd);
			recpListMap.put("pynDtlCd", pynDtlCd);
			recpListMap.put("tckSeqList", tckSeqList);
			recpListMap.put("cancCnt", cancCnt);
			recpListMap.put("TRD_DTM", TRD_DTM);
			recpListMap.put("alcnDeprDt", alcnDeprDt);
			recpListMap.put("alcnDeprTime", alcnDeprTime);
			recpListMap.put("deprnNm", deprnNm);
			recpListMap.put("arvlNm", arvlNm);
			recpListMap.put("takeDrtm", takeDrtm);
			recpListMap.put("cacmNm", cacmNm);
			recpListMap.put("deprNm", deprNm);
			recpListMap.put("adltNum", adltNum);
			recpListMap.put("chldNum", chldNum);
			recpListMap.put("teenNum", teenNum);
			recpListMap.put("setsList", seatNo);

			String rideDateTime = alcnDeprDt + alcnDeprTime;

			if ("cancel".equals(ajaxType)) {
				cancelResult = resvService.cancelResvList(mrsMrnpno);
				changeRemainSeats = busReservationMapper.updateRemainSeats(mrsMrnpno, rideDateTime);
			}


			recpListMap.put("cancelResult", cancelResult);
			recpListMap.put("changeRemainSeats", changeRemainSeats);

			System.out.println("cancelResult : " + cancelResult);
			System.out.println("changeRemainSeats : " + changeRemainSeats);

		} catch (Exception e) {
			recpListMap.put("error", "오류 발생: " + e.getMessage());
		}


		if (recpListMap == null || recpListMap.isEmpty()) {
			return ResponseEntity.noContent().build(); // 204 No Content
		} else {
			return ResponseEntity.ok(recpListMap); // 200 OK with JSON body
		}
	}


}
