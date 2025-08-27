package org.kobus.spring.controller;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.kobus.spring.service.admin.AdminService;
import org.kobus.spring.service.member.MemberItemPurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	
	
	@GetMapping("/adminPage.do")
	public String adminPage(Model model) throws SQLException {
		
		List<Map<String, Object>> list = this.adminService.getUserCountsByRank();
		List<Map<String, Object>> tlist = this.adminService.gerTotalInfo();
		List<Map<String, Object>> clist = this.adminService.getCouponCount();

	    int adminCount = 0;
	    int memberCount = 0;
	    int reservationCount = 0;
	    
	    
	    int totalTicketCount = 0;
	    int seasonTicketCount = 0;
	    int freeTicketCount = 0;
	    String totalRevenue = "";

	    for (Map<String, Object> row : list) {
	        String rank = (String) row.get("RANK");
	        int count = ((BigDecimal) row.get("COUNT")).intValue();

	        if ("관리자".equals(rank)) {
	            adminCount = count;
	        } else if ("회원".equals(rank)) {
	            memberCount = count;
	        }
	    }
	    
	    for (Map<String, Object> row : tlist) {
	        String sum = (String) row.get("SUM");
	        int count = ((BigDecimal) row.get("COUNT")).intValue();
	        
	        reservationCount = count;
	        totalRevenue = sum;
	    }
	    
	    for (Map<String, Object> row : clist) {
	        String ticketType = (String) row.get("TICKET_TYPE");
	        int count = ((BigDecimal) row.get("TICKET_COUNT")).intValue();

	        if ("시즌권".equals(ticketType)) {
	        	seasonTicketCount = count;
	        } else if ("프리패스".equals(ticketType)) {
	        	freeTicketCount = count;
	        }
	    }

	    int totalCount = adminCount + memberCount;
	    totalTicketCount = seasonTicketCount + freeTicketCount;
	    

	    model.addAttribute("adminCount", adminCount);
	    model.addAttribute("memberCount", memberCount);
	    model.addAttribute("totalCount", totalCount);
	    model.addAttribute("reservationCount", reservationCount);
	    model.addAttribute("totalRevenue", totalRevenue);
	    model.addAttribute("totalTicketCount", totalTicketCount);
	    model.addAttribute("seasonTicketCount", seasonTicketCount);
	    model.addAttribute("freeTicketCount", freeTicketCount);
		
		return "admin.admin/adminMain";
	}
	
	@GetMapping("/memberEditPage.do")
	public String memberEditPage(Model model) throws SQLException {
		List<Map<String, Object>> list = this.adminService.getUserCountsByRank();

	    int adminCount = 0;
	    int memberCount = 0;

	    for (Map<String, Object> row : list) {
	        String rank = (String) row.get("RANK");
	        int count = ((BigDecimal) row.get("COUNT")).intValue();

	        if ("관리자".equals(rank)) {
	            adminCount = count;
	        } else if ("회원".equals(rank)) {
	            memberCount = count;
	        }
	    }

	    int totalCount = adminCount + memberCount;

	    model.addAttribute("adminCount", adminCount);
	    model.addAttribute("memberCount", memberCount);
	    model.addAttribute("totalCount", totalCount);
		return "admin.admin/memberEditPage";
	}
	
}
