package com.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConn {

    private static Connection conn = null;

    private DBConn() {
        // private 생성자 (싱글톤 보호용)
    }

    // 기본 연결
    public static synchronized Connection getConnection() {
        try {
            if (conn == null || conn.isClosed()) {
                String className = "oracle.jdbc.driver.OracleDriver";
                String url = "jdbc:oracle:thin:@localhost:1521:xe";
                String user = "KOBUS";
                String password = "1234";

                Class.forName(className);
                conn = DriverManager.getConnection(url, user, password);
                System.out.println("✅ DBConn: 새로운 연결 생성됨");
            }
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println("❌ DBConn 오류: " + e.getMessage());
            e.printStackTrace();
        }

        return conn;
    }

    // 커스텀 연결
    public static synchronized Connection getConnection(String url, String user, String password) {
        try {
            if (conn == null || conn.isClosed()) {
                String className = "oracle.jdbc.driver.OracleDriver";
                Class.forName(className);
                conn = DriverManager.getConnection(url, user, password);
                System.out.println("✅ DBConn: 사용자 정의 연결 생성됨");
            }
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println("❌ 사용자 정의 DBConn 오류: " + e.getMessage());
            e.printStackTrace();
        }

        return conn;
    }

    // 연결 닫기
    public static void close() {
        try {
            if (conn != null && !conn.isClosed()) {
                conn.close();
                System.out.println("🛑 DBConn: 연결 종료됨");
            }
        } catch (SQLException e) {
            System.out.println("❌ DBConn 종료 오류: " + e.getMessage());
            e.printStackTrace();
        } finally {
            conn = null; // 반드시 초기화
        }
    }
}
