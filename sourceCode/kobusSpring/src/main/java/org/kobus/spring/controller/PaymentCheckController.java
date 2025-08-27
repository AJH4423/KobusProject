package org.kobus.spring.controller;

import java.util.HashMap;
import java.util.Map;

import org.kobus.spring.service.pay.PaymentCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pay")
public class PaymentCheckController {

    @Autowired
    private PaymentCheckService paymentCheckService;

    @PostMapping(value = "/confirm.ajax", produces = "application/json")
    public Map<String, Object> verifyPayment(@RequestParam("adtnPrdSno") String prdSno,
                                             @RequestParam("goodsPrice") String inputAmt) {

        System.out.println("[PassPaymentCheckController] 상품ID: " + prdSno);
        System.out.println("[PassPaymentCheckController] 클라이언트 금액: " + inputAmt);

        Map<String, Object> result = new HashMap<>();
        try {
        	inputAmt = inputAmt.replaceAll("[^0-9]", "");  // 숫자만 추출
            int serverAmt = paymentCheckService.getServerPrice(prdSno);
            int clientAmt = Integer.parseInt(inputAmt);
            
            System.out.println("✔ [서버] 파싱 후 클라이언트 금액: " + clientAmt);
            System.out.println("✔ [서버] DB 조회 서버 금액: " + serverAmt);
            
            boolean isValid = (clientAmt == serverAmt);

            result.put("status", isValid ? "success" : "fail");
            result.put("serverAmt", serverAmt);
        } catch (NumberFormatException e) {
            result.put("status", "fail");
            result.put("error", "Invalid amount format");
        }
        System.out.println("📤 [서버 응답] status: " + result.get("status"));


        return result;
    }
}
