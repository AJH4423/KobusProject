package org.kobus.spring.domain.board;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LossCenterController {

    @GetMapping("/losscenter/lossmain.do")
    public String lossMain() {
        return "losscenter.lossCenter_notice"; // tiles.xml 기준
    }
    @GetMapping("/lossCenter/kumho.do")
    public String kumho() {
        return "losscenter.lostKumho";
    }

    @GetMapping("/lossCenter/dongbu.do")
    public String dongbu() {
        return "losscenter.lostDongbu";
    }

    @GetMapping("/lossCenter/dongyang.do")
    public String dongyang() {
        return "losscenter.lostDongyang";
    }

    @GetMapping("/lossCenter/jungang.do")
    public String jungang() {
        return "losscenter.lostJungang";
    }

    @GetMapping("/lossCenter/chunil.do")
    public String chunil() {
        return "losscenter.lostChunil";
    }

    @GetMapping("/lossCenter/samhwa.do")
    public String samhwa() {
        return "losscenter.lostSamhwa";
    }

    @GetMapping("/lossCenter/hanil.do")
    public String hanil() {
        return "losscenter.lostHanil";
    }

    @GetMapping("/lossCenter/sokrisan.do")
    public String sokrisan() {
        return "losscenter.lostSokrisan";
    }

}