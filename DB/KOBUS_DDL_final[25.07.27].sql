------------------------------------------------------------- 시퀀스 삭제
-- 회원 시퀀스
DROP SEQUENCE kobusUser_seq;
--
-- 게시판 시퀀스
DROP SEQUENCE board_seq;
--
-- 댓글 시퀀스
DROP SEQUENCE brdComment_seq;
--
-- 프리패스 결제 정보 테이블
DROP SEQUENCE FREE_PASS_PAYMENT_SEQ;
--
-- 일반 예매 결제 정보 테이블
DROP SEQUENCE RESERVATION_PAYMENT_SEQ;

-- 예매 정보 시퀀스
drop sequence reservation_seq;

DROP SEQUENCE "SEQ_BUS_RESERVATION";

DROP SEQUENCE "SEQ_FREE_PASS_PAYMENT";

DROP SEQUENCE "SEQ_PAYMENT_COMMON";

DROP SEQUENCE "SEQ_RES_PASS_USAGE";

DROP SEQUENCE "SEQ_RES_SEASON_USAGE";

DROP SEQUENCE "SEQ_SEASON_TICKET_PAYMENT";

DROP SEQUENCE "SEQ_RESERVATION_PAYMENT";

------------------------------------------------------------- 테이블 전부 삭제 쿼리문 
BEGIN
  FOR t IN (SELECT table_name FROM user_tables) LOOP
    EXECUTE IMMEDIATE 'DROP TABLE "' || t.table_name || '" CASCADE CONSTRAINTS';
  END LOOP;
END;
/


/* 노선 */
DROP TABLE route 
	CASCADE CONSTRAINTS;

/* 운수사 */
DROP TABLE company 
	CASCADE CONSTRAINTS;

/* 버스 */
DROP TABLE bus 
	CASCADE CONSTRAINTS;

/* 좌석 */
DROP TABLE seat 
	CASCADE CONSTRAINTS;

/* 버스 운행 정보 */
DROP TABLE busSchedule 
	CASCADE CONSTRAINTS;

/* 예매 */
DROP TABLE reservation 
	CASCADE CONSTRAINTS;

/* 예약 좌석을 관리 */
DROP TABLE reservedSeats 
    CASCADE CONSTRAINTS;

/* 회원 */
DROP TABLE kobusUser 
	CASCADE CONSTRAINTS;

/* 게시판 */
DROP TABLE board 
	CASCADE CONSTRAINTS;

/* 댓글 */
DROP TABLE brdComment 
	CASCADE CONSTRAINTS;

/* 고객조회정보 */
DROP TABLE customerInfo 
	CASCADE CONSTRAINTS;

/* 출발지 */
DROP TABLE departure 
	CASCADE CONSTRAINTS;

/* 도착지 */
DROP TABLE arrival 
	CASCADE CONSTRAINTS;

/* 지역 */
DROP TABLE region 
	CASCADE CONSTRAINTS;

-- 1. 정기권 대표 노선 테이블
DROP TABLE SEASON_TICKET_MAIN_ROUTE
CASCADE CONSTRAINTS;

-- 2. 정기권 세부 노선 테이블
DROP TABLE SEASON_TICKET_ROUTE_DETAIL
CASCADE CONSTRAINTS;

-- 정기권 이용노선 테이블
DROP TABLE pass_route 
	CASCADE CONSTRAINTS;

-- 정기권 구매옵션 테이블
DROP TABLE PASS_DETAIL 
	CASCADE CONSTRAINTS;

-- 약관 테이블
DROP TABLE TERMS 
	CASCADE CONSTRAINTS;



DROP TABLE "PAYMENT_COMMON" CASCADE CONSTRAINTS;

-- 프리패스 옵션 테이블
DROP TABLE "FREE_PASS_OPTION" CASCADE CONSTRAINTS;

-- 프리패스 결제 정보 테이블
DROP TABLE "FREE_PASS_PAYMENT" CASCADE CONSTRAINTS;

DROP TABLE "SEASON_TICKET_ROUTE" CASCADE CONSTRAINTS;

DROP TABLE "SEASON_TICKET_OPTION" CASCADE CONSTRAINTS;

DROP TABLE "SEASON_TICKET_PAYMENT" CASCADE CONSTRAINTS;

-- 일반 예매 결제 정보 테이블
DROP TABLE "RESERVATION_PAYMENT" CASCADE CONSTRAINTS;

DROP TABLE "RES_PASS_USAGE" CASCADE CONSTRAINTS;

DROP TABLE "RES_SEASON_USAGE" CASCADE CONSTRAINTS;

/* 회원권한 */
DROP TABLE kouserAuthorities 
   CASCADE CONSTRAINTS;
------------------------------------------------------------- 테이블 생성 시작
/* 노선 */
CREATE TABLE route (
	rouid VARCHAR2(40) NOT NULL, /* 노선 ID */
	comid VARCHAR2(40) NOT NULL, /* 운수사 ID */
	arrid VARCHAR2(40), /* 도착지 ID */
	depid VARCHAR2(40), /* 출발지 ID */
	DURATION NUMBER NOT NULL /* 소요 시간 */

);

ALTER TABLE route
	ADD
		CONSTRAINT pk_route
		PRIMARY KEY (
			rouid
		);

/* 운수사 */
CREATE TABLE company (
	comid VARCHAR2(40) NOT NULL, /* 운수사 ID */
	comname VARCHAR2(50) NOT NULL, /* 운수사명 */
	regnumber NUMBER NOT NULL, /* 사업자등록번호 */
	comphone VARCHAR2(20) NOT NULL, /* 연락처 */
	comaddr VARCHAR2(100) NOT NULL /* 주소 */
);

ALTER TABLE company
	ADD
		CONSTRAINT pk_company
		PRIMARY KEY (
			comid
		);

/* 버스 */
CREATE TABLE bus (
	busid VARCHAR2(40) NOT NULL, /* 버스 ID */
	busno NUMBER NOT NULL, /* 버스 번호 */
	busgrade VARCHAR2(20) NOT NULL, /* 버스 등급 */
	busseats NUMBER NOT NULL, /* 좌석 수 */
	comid VARCHAR2(40) NOT NULL /* 운수사 ID */
);

ALTER TABLE bus
	ADD
		CONSTRAINT pk_bus
		PRIMARY KEY (
			busid
		);


/* 좌석 */
CREATE TABLE seat (
	seatid VARCHAR2(40) NOT NULL, /* 좌석 ID */
	busid VARCHAR2(40) NOT NULL, /* 버스 ID */
	seatno NUMBER NOT NULL, /* 좌석 번호 */
	seattype VARCHAR2(20) NOT NULL, /* 좌석 유형 */
	seatable CHAR(1) DEFAULT 'N' NOT NULL /* 예매 유무 */
);

ALTER TABLE seat
	ADD
		CONSTRAINT pk_seat
		PRIMARY KEY (
			seatid
		);

/* 버스 운행 정보 */
CREATE TABLE busschedule (
	bshid VARCHAR2(40) NOT NULL, /* 운행 ID */
	rouid VARCHAR2(40) NOT NULL, /* 노선 ID */
	busid VARCHAR2(40) NOT NULL, /* 버스 ID */
	departuredate TIMESTAMP NOT NULL, /* 출발일시 */
	arrivaldate TIMESTAMP NOT NULL, /* 도착일시 */
	durmin NUMBER NOT NULL, /* 소요 시간 (분) */
	remainseats NUMBER NOT NULL, /* 잔여 좌석 수 */
	status VARCHAR2(20) NOT NULL, /* 운행 상태 */
	cancelfee NUMBER DEFAULT 0, /* 취소 수수료 금액 */
	cancelable CHAR(1) DEFAULT 'Y' NOT NULL, /* 취소 수수료 대상 여부 */
	adultfare NUMBER DEFAULT 0 NOT NULL, -- 일반 요금
    	stufare NUMBER DEFAULT 0 NOT NULL,  -- 학생 요금
    	childfare NUMBER DEFAULT 0 NOT NULL -- 어린이 요금
);

ALTER TABLE busschedule
	ADD
		CONSTRAINT pk_busschedule
		PRIMARY KEY (
			bshid
		);

-- reservation_seq 시퀀스
CREATE SEQUENCE reservation_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

/* 예매 */
CREATE TABLE reservation (
	resid VARCHAR2(40) NOT NULL, /* 예매 ID */
	bshid VARCHAR2(40), /* 운행 ID (가는 편 버스스케줄 ID) */
	-- seatid 컬럼 제거, 좌석은 reservedseats 테이블에서 관리
	kusid VARCHAR2(40), /* 회원ID */
	ridedate TIMESTAMP NOT NULL, /* 탑승일자 (가는 편) */
	resvdate TIMESTAMP NOT NULL, /* 예매일자 */
	resvstatus VARCHAR2(20) NOT NULL, /* 예매 상태 */
	resvtype VARCHAR2(20), /* 예매 타입 */
	qrcode NUMBER NOT NULL, /* 탑승 QR 코드 */
	mileage NUMBER NOT NULL, /* 마일리지 적립 */
	seatable CHAR(1), /* 예매 유무 */
	
	-- 왕복 예매를 위한 오는 편 컬럼 추가
	return_bshid VARCHAR2(40), /* 오는 편 버스스케줄 ID */
	return_seatid VARCHAR2(40), /* 오는 편 좌석 ID */
	return_ridedate TIMESTAMP /* 오는 편 탑승일 */
);

ALTER TABLE reservation
	ADD
		CONSTRAINT pk_reservation
		PRIMARY KEY (
			resid
		);


        
/* 회원 */
CREATE TABLE kobususer (
	kusid VARCHAR2(40) NOT NULL, /* 회원ID */
	tel VARCHAR2(11), /* 전화번호 */
	subemail VARCHAR2(255), /* 추가이메일 */
	ID VARCHAR2(255), /* 아이디 */
	passwd VARCHAR2(255), /* 비밀번호 */
	birth DATE, /* 탄생년도 */
	gender NUMBER(1), /* 성별 */
	RANK VARCHAR2(255) DEFAULT '회원' NOT NULL, /* 등급 */
	mil NUMBER(10) DEFAULT 0 NOT NULL, /* 마일리지 */
	status VARCHAR2(1) DEFAULT 'Y' NOT NULL, /* 회원상태 */
	joindate DATE /* 가입일 */
);

ALTER TABLE kobususer
	ADD
		CONSTRAINT pk_kobususer
		PRIMARY KEY (
			kusid
		);

ALTER TABLE kobususer
	ADD
		CONSTRAINT uk_kobususer
		UNIQUE (
			subemail,
			tel
		);

-- kobusUser 시퀀스
CREATE SEQUENCE kobusUser_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

-- 게시판 생성 쿼리
CREATE TABLE board (
    brdID       NUMBER PRIMARY KEY,
    kusID       VARCHAR2(40),
    brdTitle    VARCHAR2(200),
    brdContent  CLOB,
    brdDate     TIMESTAMP DEFAULT SYSTIMESTAMP,
    brdViews    NUMBER DEFAULT 0
);

-- 게시글 시퀀스
CREATE SEQUENCE board_seq
START WITH 1
INCREMENT BY 1
NOCACHE;

--댓글테이블 생성 쿼리
CREATE TABLE brdComment (
    bcmID     NUMBER PRIMARY KEY,
    brdID     NUMBER NOT NULL,
    kusID     VARCHAR2(40),
    Content   CLOB,
    cmtDate   TIMESTAMP DEFAULT SYSTIMESTAMP
);

-- 댓글 시퀀스
CREATE SEQUENCE brdComment_seq
START WITH 1
INCREMENT BY 1
NOCACHE;

/* 고객조회정보 */
CREATE TABLE customerinfo (
	cifid VARCHAR2(40) NOT NULL, /* 고객조회정보ID */
	ciftel VARCHAR2(11), /* 휴대전화 번호 */
	residentid NUMBER /* 주민등록번호 */
);

ALTER TABLE customerinfo
	ADD
		CONSTRAINT pk_customerinfo
		PRIMARY KEY (
			cifid
		);

ALTER TABLE customerinfo
	ADD
		CONSTRAINT uk_customerinfo
		UNIQUE (
			ciftel
		);

/* 출발지 */
CREATE TABLE departure (
	depid VARCHAR2(40) NOT NULL, /* 출발지 ID */
	regid VARCHAR2(40) /* 지역ID */
);

ALTER TABLE departure
	ADD
		CONSTRAINT pk_departure
		PRIMARY KEY (
			depid
		);

/* 도착지 */
CREATE TABLE arrival (
	arrid VARCHAR2(40) NOT NULL, /* 도착지 ID */
	regid VARCHAR2(40) /* 지역ID */
);

ALTER TABLE arrival
	ADD
		CONSTRAINT pk_arrival
		PRIMARY KEY (
			arrid
		);

/* 지역 */
CREATE TABLE region (
	regid VARCHAR2(40) NOT NULL, /* 지역ID */
	regname VARCHAR2(40), /* 지역명 */
	sidocode VARCHAR2(40) NOT NULL /* 시도코드 */
);

ALTER TABLE region
	ADD
		CONSTRAINT pk_region
		PRIMARY KEY (
			regid
		);
        
-- 공통 결제 정보 테이블
CREATE TABLE PAYMENT_COMMON (
    PAYMENT_ID      VARCHAR2(40) PRIMARY KEY,  -- 공통 결제 ID
    IMP_UID         VARCHAR2(50) NOT NULL,      -- 포트원 고유 결제번호
    MERCHANT_UID    VARCHAR2(50) NOT NULL,      -- 주문 고유번호
    PAY_METHOD      VARCHAR2(20),               -- 결제수단
    AMOUNT          NUMBER,                     -- 결제금액
    PAY_STATUS      VARCHAR2(20),               -- 결제 상태 (paid, failed 등)
    PG_TID          VARCHAR2(100),              -- PG사 거래번호
    PAID_AT         TIMESTAMP,                  -- 결제 완료 시각
    REG_DT          TIMESTAMP DEFAULT SYSDATE   -- 등록일시
);

CREATE SEQUENCE SEQ_PAYMENT_COMMON START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

COMMENT ON TABLE PAYMENT_COMMON IS '포트원 공통 결제 정보';
COMMENT ON COLUMN PAYMENT_COMMON.PAYMENT_ID IS '공통 결제 ID (PK)';
COMMENT ON COLUMN PAYMENT_COMMON.IMP_UID IS '포트원 결제 고유번호';
COMMENT ON COLUMN PAYMENT_COMMON.MERCHANT_UID IS '주문 고유번호';
COMMENT ON COLUMN PAYMENT_COMMON.PAY_METHOD IS '결제수단';
COMMENT ON COLUMN PAYMENT_COMMON.AMOUNT IS '결제금액';
COMMENT ON COLUMN PAYMENT_COMMON.PAY_STATUS IS '결제상태';
COMMENT ON COLUMN PAYMENT_COMMON.PG_TID IS 'PG 거래번호';
COMMENT ON COLUMN PAYMENT_COMMON.PAID_AT IS '결제완료일시';
COMMENT ON COLUMN PAYMENT_COMMON.REG_DT IS '등록일시';

------------------------------------------------------

--  프리패스 옵션 테이블
CREATE TABLE FREE_PASS_OPTION (
    ADTN_PRD_SNO              VARCHAR2(10) PRIMARY KEY, -- 부가상품 일련번호
    ADTN_PRD_USE_CLS_CD       VARCHAR2(10),             -- 이용등급 코드
    ADTN_PRD_USE_CLS_NM       VARCHAR2(50),             -- 이용등급 이름
    ADTN_PRD_USE_PSB_DNO      NUMBER,                   -- 사용 가능 일수
    ADTN_PRD_USE_NTKN_CD      VARCHAR2(10),             -- 이용권종 코드
    ADTN_PRD_USE_NTKN_NM      VARCHAR2(50),             -- 이용권종 이름
    WKD_WKE_NTKN_CD           VARCHAR2(10),             -- 주중/주말 코드
    WKD_WKE_NTKN_NM           VARCHAR2(50),             -- 주중/주말 이름
    TEMP_ALCN_TISSU_PSB_YN    CHAR(1),                  -- 임시차 배정 가능 여부
    ADTN_DC_YN                CHAR(1),                  -- 할인 여부
    AMOUNT                    NUMBER                    -- 가격
);

COMMENT ON TABLE FREE_PASS_OPTION IS '프리패스 구매 옵션 테이블';

COMMENT ON COLUMN FREE_PASS_OPTION.ADTN_PRD_SNO IS '부가상품 일련번호 (PK)';
COMMENT ON COLUMN FREE_PASS_OPTION.ADTN_PRD_USE_CLS_CD IS '이용등급 코드';
COMMENT ON COLUMN FREE_PASS_OPTION.ADTN_PRD_USE_CLS_NM IS '이용등급 이름';
COMMENT ON COLUMN FREE_PASS_OPTION.ADTN_PRD_USE_PSB_DNO IS '사용 가능 일수';
COMMENT ON COLUMN FREE_PASS_OPTION.ADTN_PRD_USE_NTKN_CD IS '이용권종 코드';
COMMENT ON COLUMN FREE_PASS_OPTION.ADTN_PRD_USE_NTKN_NM IS '이용권종 이름';
COMMENT ON COLUMN FREE_PASS_OPTION.WKD_WKE_NTKN_CD IS '주중/주말 코드';
COMMENT ON COLUMN FREE_PASS_OPTION.WKD_WKE_NTKN_NM IS '주중/주말 이름';
COMMENT ON COLUMN FREE_PASS_OPTION.TEMP_ALCN_TISSU_PSB_YN IS '임시차 배정 가능 여부 (Y/N)';
COMMENT ON COLUMN FREE_PASS_OPTION.ADTN_DC_YN IS '할인 여부 (Y/N)';
COMMENT ON COLUMN FREE_PASS_OPTION.AMOUNT IS '가격';


-- 정기권 이용노선 테이블
CREATE TABLE pass_route (
    ROUTE_ID             VARCHAR2(10) PRIMARY KEY, -- 노선 ID
    ADTN_DEPR_NM         VARCHAR2(50),             -- 추가 출발지 이름
    ADTN_ARVL_NM         VARCHAR2(50),             -- 추가 도착지 이름
    ADTN_DEPR_CD         VARCHAR2(3),              -- 추가 출발지 코드
    ADTN_ARVL_CD         VARCHAR2(3),              -- 추가 도착지 코드
    DEPR_NM              VARCHAR2(50),             -- 출발지 이름
    ARVL_NM              VARCHAR2(50),             -- 도착지 이름
    ADTN_PRD_SELL_STT_DT VARCHAR2(8)               -- 추가 상품 판매 시작일 ('YYYYMMDD' 형식)
);

-- 정기권 구매옵션 테이블
CREATE TABLE PASS_DETAIL (
    ADTN_PRD_SNO         VARCHAR2(10) PRIMARY KEY, -- 부가상품 일련번호 (프리패스 상세 옵션 PK)
    ADTN_PRD_USE_CLS_CD  VARCHAR2(2),              -- 이용등급 코드
    ADTN_PRD_USE_CLS_NM  VARCHAR2(20),             -- 이용등급 이름
    ADTN_PRD_USE_PSB_DNO VARCHAR2(10),             -- 사용 가능 일수
    ADTN_PRD_USE_NTKN_CD VARCHAR2(2),              -- 이용권종 코드
    ADTN_PRD_USE_NTKN_NM VARCHAR2(20),             -- 이용권종 이름
    WKD_WKE_NTKN_CD      VARCHAR2(2),              -- 주중/주말 코드
    WKD_WKE_NTKN_NM      VARCHAR2(20)              -- 주중/주말 이름
);

ALTER TABLE PASS_DETAIL MODIFY ADTN_PRD_USE_CLS_NM VARCHAR2(40); -- ADTN_PRD_USE_CLS_NM 컬럼의 길이를 40으로 변경
ALTER TABLE PASS_DETAIL ADD PRICE NUMBER(10);                    -- PASS_DETAIL 테이블에 PRICE 컬럼 추가
ALTER TABLE PASS_DETAIL MODIFY WKD_WKE_NTKN_NM VARCHAR2(50);    -- WKD_WKE_NTKN_NM 컬럼의 길이를 50으로 변경


-- 프리패스 결제 정보 테이블 생성
CREATE TABLE FREE_PASS_PAYMENT (
    FREE_PASS_PAY_ID     VARCHAR2(40) PRIMARY KEY,     -- 프리패스 결제 ID
    PAYMENT_ID           VARCHAR2(40) NOT NULL,        -- 공통 결제 테이블 FK
    KUSID                VARCHAR2(40) NOT NULL,        -- 사용자 ID
    ADTN_PRD_SNO         VARCHAR2(10) NOT NULL,        -- 프리패스 옵션 ID
    START_DATE           DATE                          -- 유효기간 시작일
);

CREATE SEQUENCE SEQ_FREE_PASS_PAYMENT
START WITH 1
INCREMENT BY 1
NOCACHE; 



COMMENT ON TABLE FREE_PASS_PAYMENT IS '프리패스 결제 정보';
COMMENT ON COLUMN FREE_PASS_PAYMENT.FREE_PASS_PAY_ID IS '프리패스 결제 ID (PK)';
COMMENT ON COLUMN FREE_PASS_PAYMENT.PAYMENT_ID IS '공통 결제 테이블 ID (FK)';
COMMENT ON COLUMN FREE_PASS_PAYMENT.KUSID IS '사용자 ID';
COMMENT ON COLUMN FREE_PASS_PAYMENT.ADTN_PRD_SNO IS '프리패스 옵션 ID (FK)';
COMMENT ON COLUMN FREE_PASS_PAYMENT.START_DATE IS '이용 시작일';

ALTER TABLE FREE_PASS_PAYMENT
  ADD CONSTRAINT FK_FP_PAYMENT FOREIGN KEY (PAYMENT_ID)
  REFERENCES PAYMENT_COMMON(PAYMENT_ID);

--ALTER TABLE FREE_PASS_PAYMENT
--  ADD CONSTRAINT FK_FP_OPTION FOREIGN KEY (ADTN_PRD_SNO)
--  REFERENCES FREE_PASS_OPTION(ADTN_PRD_SNO);


-- 1. 정기권 대표 노선 테이블 (PK: ROUTE_ID)
CREATE TABLE SEASON_TICKET_MAIN_ROUTE (
    ROUTE_ID               VARCHAR2(10) PRIMARY KEY,         -- 대표 노선 ID (예: 010130)
    DEPR_NM                VARCHAR2(50),                     -- 출발지 이름
    ARVL_NM                VARCHAR2(50),                     -- 도착지 이름
    ADTN_PRD_SELL_STT_DT   VARCHAR2(8)                       -- 판매 시작일 (YYYYMMDD)
);

COMMENT ON TABLE SEASON_TICKET_MAIN_ROUTE IS '정기권 대표 노선 테이블';
COMMENT ON COLUMN SEASON_TICKET_MAIN_ROUTE.ROUTE_ID IS '대표 노선 ID (PK)';
COMMENT ON COLUMN SEASON_TICKET_MAIN_ROUTE.DEPR_NM IS '출발지 이름';
COMMENT ON COLUMN SEASON_TICKET_MAIN_ROUTE.ARVL_NM IS '도착지 이름';
COMMENT ON COLUMN SEASON_TICKET_MAIN_ROUTE.ADTN_PRD_SELL_STT_DT IS '상품 판매 시작일';


-- 2. 정기권 세부 노선 테이블 (PK: SUB_ROUTE_ID, FK: ROUTE_ID)
CREATE TABLE SEASON_TICKET_ROUTE_DETAIL (
    SUB_ROUTE_ID           VARCHAR2(20) PRIMARY KEY,         -- 세부 노선 ID (예: SUB010130_01)
    ROUTE_ID               VARCHAR2(10),                     -- 대표 노선 ID (FK)
    ADTN_DEPR_NM           VARCHAR2(50),                     -- 세부 출발지 이름
    ADTN_ARVL_NM           VARCHAR2(50),                     -- 세부 도착지 이름
    ADTN_DEPR_CD           VARCHAR2(3),                      -- 세부 출발지 코드
    ADTN_ARVL_CD           VARCHAR2(3),                      -- 세부 도착지 코드
    CONSTRAINT FK_ROUTE_DETAIL_MAIN
        FOREIGN KEY (ROUTE_ID)
        REFERENCES SEASON_TICKET_MAIN_ROUTE(ROUTE_ID)
);

COMMENT ON COLUMN SEASON_TICKET_ROUTE_DETAIL.SUB_ROUTE_ID IS '세부 노선 ID (예: SUB010130_01)';
COMMENT ON COLUMN SEASON_TICKET_ROUTE_DETAIL.ROUTE_ID IS '대표 노선 ID (SEASON_TICKET_MAIN_ROUTE 테이블의 FK)';
COMMENT ON COLUMN SEASON_TICKET_ROUTE_DETAIL.ADTN_DEPR_NM IS '세부 출발지 이름';
COMMENT ON COLUMN SEASON_TICKET_ROUTE_DETAIL.ADTN_ARVL_NM IS '세부 도착지 이름';
COMMENT ON COLUMN SEASON_TICKET_ROUTE_DETAIL.ADTN_DEPR_CD IS '세부 출발지 코드';
COMMENT ON COLUMN SEASON_TICKET_ROUTE_DETAIL.ADTN_ARVL_CD IS '세부 도착지 코드';

COMMENT ON TABLE SEASON_TICKET_ROUTE_DETAIL IS '정기권 세부 노선 정보';

------------------------------------------------------

-- 5. 정기권 옵션 테이블
CREATE TABLE SEASON_TICKET_OPTION (
    ADTN_PRD_SNO            VARCHAR2(10) PRIMARY KEY,   -- 부가상품 일련번호 (정기권 옵션 PK)
    ROUTE_ID                VARCHAR2(10),               -- 대표 노선 아이디(FK)
    ADTN_PRD_USE_CLS_CD     VARCHAR2(2),                -- 이용등급 코드
    ADTN_PRD_USE_CLS_NM     VARCHAR2(40),               -- 이용등급 이름
    ADTN_PRD_USE_PSB_DNO    VARCHAR2(10),               -- 사용 가능 일수
    ADTN_PRD_USE_NTKN_CD    VARCHAR2(2),                -- 이용권종 코드
    ADTN_PRD_USE_NTKN_NM    VARCHAR2(20),               -- 이용권종 이름
    WKD_WKE_NTKN_CD         VARCHAR2(2),                -- 주중/주말 코드
    WKD_WKE_NTKN_NM         VARCHAR2(50),               -- 주중/주말 이름
    PRICE                   NUMBER,                      -- 가격
    CONSTRAINT FK_OPTION_ROUTE
        FOREIGN KEY (ROUTE_ID)
        REFERENCES SEASON_TICKET_MAIN_ROUTE(ROUTE_ID)
);

COMMENT ON TABLE SEASON_TICKET_OPTION IS '정기권 구매 옵션 테이블';

COMMENT ON COLUMN SEASON_TICKET_OPTION.ADTN_PRD_SNO IS '부가상품 일련번호 (PK)';
COMMENT ON COLUMN SEASON_TICKET_OPTION.ROUTE_ID IS '정기권 대표 노선 ID (FK)';
COMMENT ON COLUMN SEASON_TICKET_OPTION.ADTN_PRD_USE_CLS_CD IS '이용등급 코드';
COMMENT ON COLUMN SEASON_TICKET_OPTION.ADTN_PRD_USE_CLS_NM IS '이용등급 이름';
COMMENT ON COLUMN SEASON_TICKET_OPTION.ADTN_PRD_USE_PSB_DNO IS '사용 가능 일수';
COMMENT ON COLUMN SEASON_TICKET_OPTION.ADTN_PRD_USE_NTKN_CD IS '이용권종 코드';
COMMENT ON COLUMN SEASON_TICKET_OPTION.ADTN_PRD_USE_NTKN_NM IS '이용권종 이름';
COMMENT ON COLUMN SEASON_TICKET_OPTION.WKD_WKE_NTKN_CD IS '주중/주말 코드';
COMMENT ON COLUMN SEASON_TICKET_OPTION.WKD_WKE_NTKN_NM IS '주중/주말 이름';
COMMENT ON COLUMN SEASON_TICKET_OPTION.PRICE IS '정기권 가격';

------------------------------------------------------

DROP SEQUENCE SEQ_SUB_ROUTE_ID;

-- 시퀀스 생성 (옵션 및 세부노선 ID 자동 생성용)
CREATE SEQUENCE SEQ_SUB_ROUTE_ID START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

CREATE OR REPLACE TRIGGER TRG_SET_SUB_ROUTE_ID
BEFORE INSERT ON SEASON_TICKET_ROUTE_DETAIL
FOR EACH ROW
BEGIN
    :NEW.SUB_ROUTE_ID := :NEW.ROUTE_ID || '-' || LPAD(SEQ_SUB_ROUTE_ID.NEXTVAL, 3, '0');
END;
/


-----------------------------
DROP SEQUENCE SEQ_ADTN_PRD_SNO;
CREATE SEQUENCE SEQ_ADTN_PRD_SNO START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

CREATE OR REPLACE TRIGGER TRG_SET_ADTN_PRD_SNO
BEFORE INSERT ON SEASON_TICKET_OPTION
FOR EACH ROW
BEGIN
    -- 예: ADTN-01, ADTN-02 형식
    :NEW.ADTN_PRD_SNO := 'ADTN-' || LPAD(SEQ_ADTN_PRD_SNO.NEXTVAL, 2, '0');
END;
/

------------------------------------------------------

-- 6. 정기권 결제 테이블
CREATE TABLE SEASON_TICKET_PAYMENT (
    SEASON_PAY_ID     VARCHAR2(40) PRIMARY KEY,     -- 정기권 결제 ID
    PAYMENT_ID        VARCHAR2(40) NOT NULL,        -- 공통 결제 ID
    KUSID             VARCHAR2(40) NOT NULL,        -- 사용자 ID
    ADTN_PRD_SNO      VARCHAR2(10) NOT NULL,        -- 부가상품 일련번호 (정기권 옵션 PK)
    START_DATE        DATE                          -- 유효기간 시작일
);

CREATE SEQUENCE SEQ_SEASON_TICKET_PAYMENT START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

ALTER TABLE SEASON_TICKET_PAYMENT
  ADD CONSTRAINT FK_ST_PAYMENT_ID FOREIGN KEY (PAYMENT_ID)
  REFERENCES PAYMENT_COMMON(PAYMENT_ID);

ALTER TABLE SEASON_TICKET_PAYMENT
  ADD CONSTRAINT FK_ST_PRD_ID FOREIGN KEY (ADTN_PRD_SNO)
  REFERENCES SEASON_TICKET_OPTION(ADTN_PRD_SNO);
  
COMMENT ON TABLE SEASON_TICKET_PAYMENT IS '정기권 결제 정보';
COMMENT ON COLUMN SEASON_TICKET_PAYMENT.SEASON_PAY_ID IS '정기권 결제 ID (PK)';
COMMENT ON COLUMN SEASON_TICKET_PAYMENT.PAYMENT_ID IS '공통 결제 정보 ID (FK)';
COMMENT ON COLUMN SEASON_TICKET_PAYMENT.KUSID IS '사용자 ID';
COMMENT ON COLUMN SEASON_TICKET_PAYMENT.ADTN_PRD_SNO IS '정기권 옵션 ID (부가상품 일련번호, FK)';
COMMENT ON COLUMN SEASON_TICKET_PAYMENT.START_DATE IS '이용 시작일';

------------------------------------------------------

-- 2. 일반예매 결제 연결 테이블
CREATE TABLE RESERVATION_PAYMENT (
    RES_PAY_ID      VARCHAR2(40) PRIMARY KEY,   -- 일반예매 결제 ID
    PAYMENT_ID      VARCHAR2(40),               -- 공통 결제 ID
    RES_ID          VARCHAR2(40),               -- 예매 ID
    KUSID           VARCHAR2(40)                -- 사용자 ID
);
CREATE SEQUENCE SEQ_RESERVATION_PAYMENT START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- FK 설정
--ALTER TABLE RESERVATION_PAYMENT
--  ADD CONSTRAINT FK_RP_PAYMENT FOREIGN KEY (PAYMENT_ID)
--  REFERENCES PAYMENT_COMMON(PAYMENT_ID);

--ALTER TABLE RESERVATION_PAYMENT
--  ADD CONSTRAINT FK_RP_RESERVATION FOREIGN KEY (RES_ID)
--  REFERENCES RESERVATION(RESID);

COMMENT ON TABLE RESERVATION_PAYMENT IS '일반예매 결제 정보';
COMMENT ON COLUMN RESERVATION_PAYMENT.RES_PAY_ID IS '일반예매 결제 ID (PK)';
COMMENT ON COLUMN RESERVATION_PAYMENT.PAYMENT_ID IS '공통 결제 ID (FK)';
COMMENT ON COLUMN RESERVATION_PAYMENT.RES_ID IS '예매 ID (FK)';
COMMENT ON COLUMN RESERVATION_PAYMENT.KUSID IS '사용자 ID';

------------------------------------------------------


-- 프리패스 사용 기록
CREATE TABLE RES_PASS_USAGE (
    USAGE_ID           VARCHAR2(40) PRIMARY KEY,  -- 사용 기록 ID
    RES_ID             VARCHAR2(40),              -- 예매 ID
    FREE_PASS_PAY_ID   VARCHAR2(40),              -- 프리패스 결제 ID
    USED_DATE          TIMESTAMP                  -- 사용일 (예매일 기준)
);

CREATE SEQUENCE SEQ_RES_PASS_USAGE START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

ALTER TABLE RES_PASS_USAGE
  ADD CONSTRAINT FK_USAGE_RES_ID FOREIGN KEY (RES_ID)
  REFERENCES RESERVATION(RESID);

ALTER TABLE RES_PASS_USAGE
  ADD CONSTRAINT FK_USAGE_PASS_ID FOREIGN KEY (FREE_PASS_PAY_ID)
  REFERENCES FREE_PASS_PAYMENT(FREE_PASS_PAY_ID);

COMMENT ON TABLE RES_PASS_USAGE IS '프리패스를 이용한 예매 기록';
COMMENT ON COLUMN RES_PASS_USAGE.USAGE_ID IS '프리패스 사용 기록 ID (PK)';
COMMENT ON COLUMN RES_PASS_USAGE.RES_ID IS '예매 ID (FK)';
COMMENT ON COLUMN RES_PASS_USAGE.FREE_PASS_PAY_ID IS '프리패스 결제 ID (FK)';
COMMENT ON COLUMN RES_PASS_USAGE.USED_DATE IS '프리패스 사용일자 (예매 기준)';

-- 정기권 사용 기록
CREATE TABLE RES_SEASON_USAGE (
    USAGE_ID            VARCHAR2(40) PRIMARY KEY,  -- 사용 기록 ID
    RES_ID              VARCHAR2(40),              -- 예매 ID
    SEASON_PAY_ID       VARCHAR2(40),              -- 정기권 결제 ID
    USED_DATE           TIMESTAMP                  -- 사용일
);

CREATE SEQUENCE SEQ_RES_SEASON_USAGE START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

ALTER TABLE RES_SEASON_USAGE
  ADD CONSTRAINT FK_USAGE_RES_ID2 FOREIGN KEY (RES_ID)
  REFERENCES RESERVATION(RESID);

ALTER TABLE RES_SEASON_USAGE
  ADD CONSTRAINT FK_USAGE_SEASON_ID FOREIGN KEY (SEASON_PAY_ID)
  REFERENCES SEASON_TICKET_PAYMENT(SEASON_PAY_ID);

COMMENT ON TABLE RES_SEASON_USAGE IS '정기권을 이용한 예매 기록';
COMMENT ON COLUMN RES_SEASON_USAGE.USAGE_ID IS '정기권 사용 기록 ID (PK)';
COMMENT ON COLUMN RES_SEASON_USAGE.RES_ID IS '예매 ID (FK)';
COMMENT ON COLUMN RES_SEASON_USAGE.SEASON_PAY_ID IS '정기권 결제 ID (FK)';
COMMENT ON COLUMN RES_SEASON_USAGE.USED_DATE IS '정기권 사용일자 (예매 기준)';

-- 약관 테이블
CREATE TABLE TERMS (
    TERMS_ID    NUMBER PRIMARY KEY,          -- 약관 ID (1: 서비스, 2: 운송 등)
    TERMS_TYPE  VARCHAR2(20) NOT NULL,       -- 약관 유형 (예: '서비스', '운송')
    TITLE       VARCHAR2(100) NOT NULL,      -- 약관 제목
    VERSION     VARCHAR2(20) NOT NULL,       -- 약관 버전 (예: 'v1.0', '2025.07.12')
    CONTENT     CLOB NOT NULL,               -- 약관 본문 (HTML 형식 가능)
    REG_DATE    DATE DEFAULT SYSDATE         -- 등록일시
);

COMMENT ON TABLE TERMS IS '약관 마스터 테이블';
COMMENT ON COLUMN TERMS.TERMS_ID IS '약관 ID (PK)';
COMMENT ON COLUMN TERMS.TERMS_TYPE IS '약관 유형 (예: 서비스, 운송)';
COMMENT ON COLUMN TERMS.TITLE IS '약관 제목';
COMMENT ON COLUMN TERMS.VERSION IS '약관 버전 (예: v1.0 등)';
COMMENT ON COLUMN TERMS.CONTENT IS '약관 본문';
COMMENT ON COLUMN TERMS.REG_DATE IS '약관 등록일시';


-- 약관 동의 테이블 (*** 나중에 KUSID FK로 받기!!!)
CREATE TABLE TERMS_AGREE (
    AGREE_ID   VARCHAR2(40) PRIMARY KEY,     -- 동의 이력 ID
    KUSID      VARCHAR2(40) NOT NULL,        -- 사용자 ID
    RES_ID     VARCHAR2(40) NOT NULL,        -- 예매 ID (RESERVATION의 RESID FK)
    TERMS_ID   NUMBER NOT NULL,              -- 약관 ID (TERMS 테이블 FK)
    VERSION    VARCHAR2(20) NOT NULL,        -- 동의한 약관 버전
    AGREE_DATE DATE DEFAULT SYSDATE          -- 동의 일시
);

-- 약관 FK
ALTER TABLE TERMS_AGREE
  ADD CONSTRAINT FK_TERMS_AGREE_TERMS
  FOREIGN KEY (TERMS_ID)
  REFERENCES TERMS(TERMS_ID);

-- 예매 FK
ALTER TABLE TERMS_AGREE
  ADD CONSTRAINT FK_TERMS_AGREE_RES
  FOREIGN KEY (RES_ID)
  REFERENCES RESERVATION(RESID);

COMMENT ON TABLE TERMS_AGREE IS '사용자 약관 동의 이력 테이블';
COMMENT ON COLUMN TERMS_AGREE.AGREE_ID IS '동의 이력 ID (PK)';
COMMENT ON COLUMN TERMS_AGREE.KUSID IS '사용자 ID';
COMMENT ON COLUMN TERMS_AGREE.RES_ID IS '예매 ID (FK)';
COMMENT ON COLUMN TERMS_AGREE.TERMS_ID IS '약관 ID (FK)';
COMMENT ON COLUMN TERMS_AGREE.VERSION IS '동의한 약관 버전';
COMMENT ON COLUMN TERMS_AGREE.AGREE_DATE IS '약관 동의 일시';


/* 예약 좌석을 관리하는 테이블 */
CREATE TABLE reservedseats (
    resid VARCHAR2(20) NOT NULL,     -- 예약번호
    seatid VARCHAR2(20) NOT NULL,    -- 좌석번호
    bshid VARCHAR2(20),              -- 버스스케줄 ID
    kusid VARCHAR2(20),              -- 고객 ID
	seattype VARCHAR2(20),

    CONSTRAINT pk_reservedseats PRIMARY KEY (resid, seatid),  -- 예약번호+좌석번호 복합 기본키 설정

    CONSTRAINT fk_reservedseats_reservation FOREIGN KEY (resid)
        REFERENCES reservation(resid) ON DELETE CASCADE,  -- 예약 테이블 참조, 예약 삭제 시 좌석도 함께 삭제

    CONSTRAINT fk_reservedseats_busschedule FOREIGN KEY (bshid)
        REFERENCES busschedule(bshid) ON DELETE CASCADE,  -- 버스스케줄 테이블 참조, 스케줄 삭제 시 좌석 예약도 함께 삭제

    CONSTRAINT fk_reservedseats_customer FOREIGN KEY (kusid)
        REFERENCES kobususer(kusid) ON DELETE CASCADE      -- 고객 테이블 참조, 고객 삭제 시 좌석 예약도 함께 삭제
);

------------------------------------------------------------- 테이블 생성 끝

------------------------------------------------------------- 외래키 설정 쿼리문
ALTER TABLE route
	ADD
		CONSTRAINT fk_company_to_route
		FOREIGN KEY (
			comid
		)
		REFERENCES company (
			comid
		)
        ON DELETE CASCADE;

ALTER TABLE route
	ADD
		CONSTRAINT fk_arrival_to_route
		FOREIGN KEY (
			arrid
		)
		REFERENCES arrival (
			arrid
		)
        ON DELETE CASCADE;

ALTER TABLE route
	ADD
		CONSTRAINT fk_departure_to_route
		FOREIGN KEY (
			depid
		)
		REFERENCES departure (
			depid
		)
        ON DELETE CASCADE;

ALTER TABLE bus
	ADD
		CONSTRAINT fk_company_to_bus
		FOREIGN KEY (
			comid
		)
		REFERENCES company (
			comid
		)
        ON DELETE CASCADE;

ALTER TABLE seat
	ADD
		CONSTRAINT fk_bus_to_seat
		FOREIGN KEY (
			busid
		)
		REFERENCES bus (
			busid
		)
        ON DELETE CASCADE;

ALTER TABLE busschedule
	ADD
		CONSTRAINT fk_route_to_busschedule
		FOREIGN KEY (
			rouid
		)
		REFERENCES route (
			rouid
		)
        ON DELETE CASCADE;

ALTER TABLE busschedule
	ADD
		CONSTRAINT fk_bus_to_busschedule
		FOREIGN KEY (
			busid
		)
		REFERENCES bus (
			busid
		)
        ON DELETE CASCADE;

ALTER TABLE reservation
	ADD
		CONSTRAINT fk_busschedule_to_reservation
		FOREIGN KEY (
			bshid
		)
		REFERENCES busschedule (
			bshid
		)
        ON DELETE CASCADE;


ALTER TABLE reservation
	ADD
		CONSTRAINT fk_kobususer_to_reservation
		FOREIGN KEY (
			kusid
		)
		REFERENCES kobususer (
			kusid
		)
        ON DELETE CASCADE;
        

-- 게시판 외래키
ALTER TABLE board
ADD CONSTRAINT fk_board_kusID
FOREIGN KEY (kusID)
REFERENCES kobusUser(kusID)
ON DELETE CASCADE;

ALTER TABLE kobusUser
ADD CONSTRAINT user_id_unique UNIQUE(id);

-- 댓글 테이블 외래키
ALTER TABLE brdComment
ADD CONSTRAINT fk_user_to_brdcomment
FOREIGN KEY (kusID)
REFERENCES kobusUser(id)
ON DELETE CASCADE;


ALTER TABLE departure
	ADD
		CONSTRAINT fk_region_to_departure
		FOREIGN KEY (
			regid
		)
		REFERENCES region (
			regid
		)
        ON DELETE CASCADE;

ALTER TABLE arrival
	ADD
		CONSTRAINT fk_region_to_arrival
		FOREIGN KEY (
			regid
		)
		REFERENCES region (
			regid
		)
        ON DELETE CASCADE;  
        
-- FREE_PASS_PAYMENT
ALTER TABLE FREE_PASS_PAYMENT
ADD CONSTRAINT fk_freepasspayment_kobususer
FOREIGN KEY (kusid) REFERENCES kobususer(kusid) ON DELETE CASCADE;

-- FREE_PASS_PAYMENT 테이블에 FREE_PASS_OPTION 테이블의 ADTN_PRD_SNO를 참조하는 외래키 추가
ALTER TABLE FREE_PASS_PAYMENT
ADD CONSTRAINT FK_FREE_PASS_PAYMENT_OPTION 
FOREIGN KEY (ADTN_PRD_SNO)
REFERENCES FREE_PASS_OPTION (ADTN_PRD_SNO) ON DELETE CASCADE; 


-- RESERVATION 테이블의 RES_ID 참조 (예매번호 FK)
ALTER TABLE RESERVATION_PAYMENT
ADD CONSTRAINT FK_RESERV_PAYMENT_TO_RESERV
FOREIGN KEY (RES_ID)
REFERENCES RESERVATION (RESID) ON DELETE CASCADE;

-- 회원 아이디(FK)
ALTER TABLE RESERVATION_PAYMENT
ADD CONSTRAINT FK_RESERV_PAYMENT_TO_USER
FOREIGN KEY (KUSID)
REFERENCES KOBUSUSER (KUSID) ON DELETE CASCADE;

-- 정기권 결제정보(FK)
ALTER TABLE RESERVATION_PAYMENT
ADD CONSTRAINT FK_RESERV_PAYMENT_TO_PAYMENT
FOREIGN KEY (PAYMENT_ID)
REFERENCES PAYMENT (PAYMENT_ID) ON DELETE CASCADE;

-- 프리패스 결제정보(FK)
ALTER TABLE RESERVATION_PAYMENT
ADD CONSTRAINT FK_RESERV_PAYMENT_TO_FREE_PASS_PAYMENT
FOREIGN KEY (FREE_PASS_PAYMENT_ID)
REFERENCES FREE_PASS_PAYMENT (FREE_PASS_PAYMENT_ID) ON DELETE CASCADE;



/* 회원 권한부여하는 테이블생성 - kobususer UNIQUE 제약조건 추가후 생성해야하므로 밑에 생성 */
CREATE TABLE kouserAuthorities
(
    username VARCHAR2(50) 
  , authority VARCHAR2(50) 
  , CONSTRAINT FK_kouserAuthorities_USERNAME  FOREIGN KEY(username) REFERENCES kobususer(id) ON DELETE CASCADE
);

------------------------------------------------------------- 외래키 설정 쿼리문 끝


------------------------------------------------------------- 예매 취소 트리거 
DROP TRIGGER trg_reservation_cancel;

CREATE OR REPLACE TRIGGER trg_reservation_cancel
AFTER UPDATE OF RESVSTATUS ON RESERVATION
FOR EACH ROW
WHEN (NEW.RESVSTATUS = '예약취소' AND OLD.RESVSTATUS = '결제완료' AND OLD.SEATABLE = 'Y')
BEGIN
    -- 1. SEAT 테이블 : 좌석 상태 변경
    UPDATE SEAT
    SET SEATABLE = 'Y'
    WHERE SEATID IN (
        SELECT SEATID FROM RESERVEDSEATS WHERE RESID = :NEW.RESID
    );

    -- 2. RESERVEDSEATS 테이블 : RESERVEDSEATS 테이블에서 예약 취소 된 좌석 삭제
    DELETE FROM RESERVEDSEATS
    WHERE RESID = :NEW.RESID;
END;
/

------------------------------------------------------------- 예매 후 잔여좌석 갱신 및 좌석 정보 저장 트리거 

CREATE OR REPLACE PROCEDURE AFTER_RESERVATION (
    p_resid       IN VARCHAR2,
    p_bshid       IN VARCHAR2,
    p_kusid       IN VARCHAR2,
    p_seat_list   IN VARCHAR2,  -- 'SEAT022,SEAT023,SEAT024'
    p_selAdltCnt  IN NUMBER,
    p_selTeenCnt  IN NUMBER,
    p_selChldCnt  IN NUMBER
)
AS
    v_start      PLS_INTEGER := 1;
    v_end        PLS_INTEGER := 0;
    v_seat       VARCHAR2(50);
    v_total      NUMBER := p_selAdltCnt + p_selTeenCnt + p_selChldCnt;
    v_index      NUMBER := 1;
    v_seattype   VARCHAR2(10);
BEGIN
    LOOP
        v_end := INSTR(p_seat_list, ',', v_start);

        IF v_end > 0 THEN
            v_seat := SUBSTR(p_seat_list, v_start, v_end - v_start);
        ELSE
            v_seat := SUBSTR(p_seat_list, v_start);
        END IF;

        -- 인원수에 따라 SEATTYPE 결정
        IF v_index <= p_selAdltCnt THEN
            v_seattype := 'ADULT';
        ELSIF v_index <= p_selAdltCnt + p_selTeenCnt THEN
            v_seattype := 'STUDENT';
        ELSE
            v_seattype := 'CHILD';
        END IF;

        INSERT INTO RESERVEDSEATS (RESID, SEATID, BSHID, KUSID, SEATTYPE)
        VALUES (p_resid, v_seat, p_bshid, p_kusid, v_seattype);

        UPDATE SEAT
        SET SEATABLE = 'N'
        WHERE SEATID = v_seat;

        IF v_end = 0 THEN
            EXIT; -- 마지막 좌석 처리 후 종료
        ELSE
            v_start := v_end + 1;
        END IF;

        v_index := v_index + 1;
    END LOOP;

    COMMIT;
END;
/


------------------------------------------------------------- 커밋 
commit;
------------------------------------------------------------- 전체 테이블 조회 테이블 
SELECT table_name FROM user_tables;
/

------------------------------------------------------------- 커밋 
commit;
/