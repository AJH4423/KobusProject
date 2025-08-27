package koBus.mvc.command;

import java.sql.Connection;
import java.sql.SQLException;

import com.util.DBConn;

import koBus.mvc.domain.BusPaymentDTO;
import koBus.mvc.domain.BusReservationDTO;
import koBus.mvc.persistence.BusPaymentDAO;
import koBus.mvc.persistence.BusReservationDAO;

public class BusPaymentService {

    public boolean insertReservationAndPayment(BusReservationDTO resDto, BusPaymentDTO payDto) {
        Connection conn = null;
        boolean isSuccess = false;

        try {
            conn = DBConn.getConnection();
            conn.setAutoCommit(false); // 트랜잭션 시작

            BusReservationDAO resDao = new BusReservationDAO();
            BusPaymentDAO payDao = new BusPaymentDAO();

            int resResult = resDao.insertReservation(resDto);
            int payResult = payDao.insertPayment(payDto);


            if (resResult > 0 && payResult > 0) {
                conn.commit();
                isSuccess = true;
            } else {
                conn.rollback();
            }

        } catch (Exception e) {
            System.out.println("[BusPaymentService] 예외 발생: " + e.getMessage());
            try {
                if (conn != null) conn.rollback();
            } catch (SQLException se) {
                System.out.println("롤백 실패: " + se.getMessage());
            }
        } finally {
            DBConn.close();
        }

        return isSuccess;
    }
}