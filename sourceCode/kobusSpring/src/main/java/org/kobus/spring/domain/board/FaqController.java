package org.kobus.spring.domain.board;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FaqController {

    @GetMapping("/faq/list.do")
    public String faqPage() {
        return "faq.go_bus_faq";
    }
}
