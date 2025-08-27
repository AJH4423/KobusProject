package org.kobus.spring.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.kobus.spring.domain.region.RegionDTO;
import org.kobus.spring.mapper.region.RegionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
/* @RequestMapping("/koBus/*") */
//@RequestMapping("/reservation/*")
public class RegionController {

    @Autowired
    private RegionMapper regionMapper;
    
    @GetMapping("/region.do")
    public String showReservationPage() {
        log.info("> RegionController.showReservationPage() 실행");
        return "kobus.reservation/KOBUSreservationRegion"; 
    }

    // AJAX 요청 처리용 - JSON 반환
    @GetMapping(value = "/getTerminals.do", produces = "application/json; charset=UTF-8")
    @ResponseBody
    public List<RegionDTO> getTerminals(
            @RequestParam("sidoCode") String sidoCodeStr,
            HttpServletResponse response) {

        log.info("> RegionController.getTerminals() 실행");
        log.info("> sidoCode 파라미터: " + sidoCodeStr);

        try {
            if ("all".equalsIgnoreCase(sidoCodeStr)) {
                return regionMapper.selectAll();
            } else {
                int sidoCode = Integer.parseInt(sidoCodeStr);
                return regionMapper.selectBySidoCode(sidoCode);
            }
        } catch (NumberFormatException e) {
            log.error("> 잘못된 sidoCode: " + sidoCodeStr);
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return null;
        }
    }

}
