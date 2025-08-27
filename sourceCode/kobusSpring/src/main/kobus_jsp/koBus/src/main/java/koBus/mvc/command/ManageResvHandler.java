package koBus.mvc.command;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.util.ConnectionProvider;

import koBus.mvc.domain.ResvDTO;
import koBus.mvc.persistence.ResvDAO;
import koBus.mvc.persistence.ResvDAOImpl;

public class ManageResvHandler implements CommandHandler{

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, Exception, Throwable {
		
		System.out.println("> ManageResvHandler.process() ...");
		
		Connection conn = ConnectionProvider.getConnection();
		ResvDAO dao = new ResvDAOImpl(conn);
		HttpSession session = request.getSession(false);
		
		 if (session == null || session.getAttribute("id") == null) {
		        // 로그인 안 된 상태
		        response.sendRedirect("/koBus/koBusFile/logonMain.jsp");
		        return null;
		}
		
		String loginId = (String) session.getAttribute("id");
		System.out.println("현재 로그인한 사용자 ID: " + loginId);
		
		// 예매 내역 조회
		List<ResvDTO> resvList = dao.searchResvList(loginId);
		
		List<ResvDTO> cancelList = dao.searchCancelResvList(loginId);
		
		String ajax = request.getParameter("ajax");
		
		String ajaxtype = request.getParameter("type");
		
		System.out.println("ajaxtype " + ajaxtype);
		
		int cancelResult = 0;
		int changeRemainSeats = 0;

		if ("true".equalsIgnoreCase(ajax)) {
		    // 예매 취소 금액 정보 조회 처리
		    Map<String, Object> recpListMap = new HashMap<>();
		    try {
		        String mrsMrnpNo = request.getParameter("mrsMrnpno");
		        String mrsMrnpSno = request.getParameter("mrsMrnpSno");
		        String prmmDcDvsCd = request.getParameter("prmmDcDvsCd");
		        String rtrpMrsYn = request.getParameter("rtrpMrsYn");
		        String BRKP_AMT_CMM = request.getParameter("BRKP_AMT_CMM");
		        String pynDvsCd = request.getParameter("pynDvsCd");
		        String pynDtlCd = request.getParameter("pynDtlCd");
		        String tckSeqList = request.getParameter("tckSeqList");
		        String cancCnt = request.getParameter("cancCnt");
		        String TRD_DTM = request.getParameter("TRD_DTM");
		     // 2. 프론트 표기용 정보도 추출
		        String alcnDeprDt = request.getParameter("alcnDeprDt");
		        String alcnDeprTime = request.getParameter("alcnDeprTime");
		        String deprnNm = request.getParameter("deprnNm");
		        String arvlNm = request.getParameter("arvlNm");
		        String takeDrtm = request.getParameter("takeDrtm");
		        String cacmNm = request.getParameter("cacmNm");
		        String deprNm = request.getParameter("deprNm");
		        String adltNum = request.getParameter("adltNum");
		        String chldNum = request.getParameter("chldNum");
		        String teenNum = request.getParameter("teenNum");
		        String setsList = request.getParameter("seatNo");
		        

		        recpListMap.put("type", ajaxtype);
		        recpListMap.put("mrsMrnpNo", mrsMrnpNo);
		        recpListMap.put("mrsMrnpSno", mrsMrnpSno);
		        recpListMap.put("prmmDcDvsCd", prmmDcDvsCd);
		        recpListMap.put("rtrpMrsYn", rtrpMrsYn);
		        recpListMap.put("BRKP_AMT_CMM", BRKP_AMT_CMM);
		        recpListMap.put("pynDvsCd", pynDvsCd);
		        recpListMap.put("pynDtlCd", pynDtlCd);
		        recpListMap.put("tckSeqList", tckSeqList);
		        recpListMap.put("cancCnt", cancCnt);
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
		        recpListMap.put("setsList", setsList);
		        recpListMap.put("TRD_DTM", TRD_DTM);
		        
		        String rideTime = alcnDeprDt + "" + alcnDeprTime;
		        
		        if ("cancel".equalsIgnoreCase(ajaxtype)) {
		        	mrsMrnpNo = request.getParameter("mrsMrnpno");
		        	recpListMap.put("type", ajaxtype);
		        	  
		        		// 예약 내역 취소
		                cancelResult = dao.cancelResvList(mrsMrnpNo);
		                
		                // 남은좌석 갱신
		                changeRemainSeats = dao.changeRemainSeats(mrsMrnpNo, rideTime);
		                
		                // 처리 결과 및 필요한 값 저장
		                recpListMap.put("cancelResult", cancelResult);
		                recpListMap.put("mrsMrnpNo", mrsMrnpNo);

				}
		        
		      
                System.out.println("cancelResult : " + cancelResult);
                System.out.println("changeRemainSeats : " + changeRemainSeats);

		    } catch (Exception e) {
		    	recpListMap.put("error", "오류 발생: " + e.getMessage());
		    }

		    Gson gson = new Gson();
		    String json = gson.toJson(recpListMap);
		    response.setContentType("application/json;charset=UTF-8");
		    PrintWriter out = response.getWriter();
		    out.write(json);
		    out.flush();
		    out.close();
		    return null;
		}

		request.setAttribute("resvList", resvList);
		request.setAttribute("cancelList", cancelList);
		
		return "/koBusFile/kobusManageResv.jsp";
	}

}
