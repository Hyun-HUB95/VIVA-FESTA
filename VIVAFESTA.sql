ALTER SESSION SET "_ORACLE_SCRIPT"=true;
DROP USER VIVAFESTA CASCADE; -- 기존 사용자 삭제
CREATE USER VIVAFESTA IDENTIFIED BY 123456 -- 사용자 이름: Model, 비밀번호 : 1234
    DEFAULT TABLESPACE USERS
    TEMPORARY TABLESPACE TEMP;
GRANT connect,resource, dba TO VIVAFESTA; -- 권한 부여

-- 각 테이블별 시퀀스 생성
CREATE SEQUENCE SEQ_USER_ACCOUNT_NO START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_EVENT_NO START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_EVENT_REVIEW_NO START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_EVENT_IMG_NO START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_RESERVED_NO START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_NOTICE_NO START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_CANCELED_NO START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_BANNER_NO START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE SEQ_USER_MANAGEMENT_EVENT_NO START WITH 1 INCREMENT BY 1 NOCACHE;

-- 사용자 테이블 (USER_ACCOUNT)
CREATE TABLE USER_ACCOUNT (
    NO NUMBER(6) NOT NULL,
    ID VARCHAR2(500) NOT NULL,
    PWD VARCHAR2(20) NOT NULL,
    PHONE VARCHAR2(15) NOT NULL,
    EMAIL VARCHAR2(500) NOT NULL,
    GENDER CHAR(1) NOT NULL,
    REG_DATE DATE DEFAULT SYSDATE NOT NULL,
    ROLE NUMBER(1) DEFAULT 2 NOT NULL,
    BIRTH DATE NOT NULL,
    REGION VARCHAR2(20) NOT NULL,
    PROVIDER VARCHAR2(20) NOT NULL,
    NAME VARCHAR2(20) NOT NULL,
    NICKNAME VARCHAR2(50) NOT NULL
);
ALTER TABLE USER_ACCOUNT ADD CONSTRAINT USER_ACCOUNT_NO_PK PRIMARY KEY (NO);
ALTER TABLE USER_ACCOUNT ADD CONSTRAINT USER_ACCOUNT_ID_UQ UNIQUE (ID);
ALTER TABLE USER_ACCOUNT ADD CONSTRAINT USER_ACCOUNT_EMAIL_UQ UNIQUE (EMAIL);
ALTER TABLE USER_ACCOUNT ADD CONSTRAINT USER_ACCOUNT_GENDER_CHK CHECK (GENDER IN ('M', 'F'));
ALTER TABLE USER_ACCOUNT ADD CONSTRAINT USER_ACCOUNT_ROLE_CHK CHECK (ROLE IN (0,1,2));
ALTER TABLE USER_ACCOUNT MODIFY PWD VARCHAR2(200);

-- 축제 테이블 (EVENT)
CREATE TABLE EVENT (
    NO NUMBER(6) NOT NULL,
    USER_ACCOUNT_NO NUMBER(6),
    PRICE NUMBER(10) NOT NULL,
    RATING NUMBER(4,2) DEFAULT 3 NOT NULL
);

ALTER TABLE EVENT ADD CONSTRAINT EVENT_NO_PK PRIMARY KEY (NO);
ALTER TABLE EVENT ADD CONSTRAINT EVENT_USER_ACCOUNT_FK FOREIGN KEY (USER_ACCOUNT_NO) REFERENCES USER_ACCOUNT(NO) ON DELETE SET NULL;

-- 축제 리뷰 테이블 (EVENT_REVIEW)
CREATE TABLE EVENT_REVIEW (
    NO NUMBER(6) NOT NULL,
    TITLE VARCHAR2(100) NOT NULL,
    CONTENT VARCHAR2(500) NOT NULL,
    SUB_DATE DATE DEFAULT SYSDATE NOT NULL,
    EVENT_NO NUMBER(6),
    USER_ACCOUNT_NO NUMBER(6),
    RATING NUMBER(4,2) NOT NULL
);

ALTER TABLE EVENT_REVIEW ADD CONSTRAINT EVENT_REVIEW_NO_PK PRIMARY KEY (NO);
ALTER TABLE EVENT_REVIEW ADD CONSTRAINT EVENT_REVIEW_EVENT_FK FOREIGN KEY (EVENT_NO) REFERENCES EVENT(NO) ON DELETE SET NULL;
ALTER TABLE EVENT_REVIEW ADD CONSTRAINT EVENT_REVIEW_USER_ACCOUNT_FK FOREIGN KEY (USER_ACCOUNT_NO) REFERENCES USER_ACCOUNT(NO) ON DELETE SET NULL;
ALTER TABLE EVENT_REVIEW ADD CONSTRAINT EVENT_REVIEW_RATING_CHK CHECK (RATING BETWEEN 0 AND 5);

-- 축제 사진 파일 테이블 (EVENT_IMG)
CREATE TABLE EVENT_IMG (
    NO NUMBER(6) NOT NULL,
    EVENT_NO NUMBER(6),
    URL VARCHAR2(500) NOT NULL,
    THUMBURL VARCHAR2(500) NOT NULL
);

ALTER TABLE EVENT_IMG ADD CONSTRAINT EVENT_IMG_NO_PK PRIMARY KEY (NO);
ALTER TABLE EVENT_IMG ADD CONSTRAINT EVENT_IMG_EVENT_FK FOREIGN KEY (EVENT_NO) REFERENCES EVENT(NO) ON DELETE SET NULL;
ALTER TABLE EVENT_IMG ADD CONSTRAINT EVENT_IMG_URL_UQ UNIQUE (URL);
ALTER TABLE EVENT_IMG ADD CONSTRAINT EVENT_IMG_THUMBURL_UQ UNIQUE (THUMBURL);

-- 예매내역 테이블 (RESERVED)
CREATE TABLE RESERVED (
    NO NUMBER(6) NOT NULL,
    ID VARCHAR(50) NOT NULL,
    EVENT_NO NUMBER(6),
    USER_ACCOUNT_NO NUMBER(6),
    QT NUMBER(3) NOT NULL,
    RESERVED_DATE DATE DEFAULT SYSDATE NOT NULL,
    TOTAL_COST NUMBER(10) NOT NULL
);

ALTER TABLE RESERVED ADD CONSTRAINT RESERVED_NO_PK PRIMARY KEY (NO);
ALTER TABLE RESERVED ADD CONSTRAINT RESERVED_ID_UQ UNIQUE (ID);
ALTER TABLE RESERVED ADD CONSTRAINT RESERVED_EVENT_FK FOREIGN KEY (EVENT_NO) REFERENCES EVENT(NO) ON DELETE SET NULL;
ALTER TABLE RESERVED ADD CONSTRAINT RESERVED_USER_ACCOUNT_FK FOREIGN KEY (USER_ACCOUNT_NO) REFERENCES USER_ACCOUNT(NO) ON DELETE SET NULL;
ALTER TABLE RESERVED ADD CONSTRAINT RESERVED_QT_CHK CHECK (QT > 0);

-- 공지사항 테이블 (NOTICE)
CREATE TABLE NOTICE (
    NO NUMBER(6) NOT NULL,
    TITLE VARCHAR2(100) NOT NULL,
    CONTENT VARCHAR2(500) NOT NULL,
    SUB_DATE DATE DEFAULT SYSDATE NOT NULL
);

ALTER TABLE NOTICE ADD CONSTRAINT NOTICE_NO_PK PRIMARY KEY (NO);

-- 취소내역 테이블 (CANCELED)
CREATE TABLE CANCELED (
    NO NUMBER(6) NOT NULL,
    ID VARCHAR(50) NOT NULL,
    EVENT_NO NUMBER(6),
    USER_ACCOUNT_NO NUMBER(6),
    QT NUMBER(3) NOT NULL,
    RESERVED_DATE DATE DEFAULT SYSDATE NOT NULL,
    TOTAL_COST NUMBER(10) NOT NULL
);

ALTER TABLE CANCELED ADD CONSTRAINT CANCELED_NO_PK PRIMARY KEY (NO);
ALTER TABLE CANCELED ADD CONSTRAINT CANCELED_ID_UQ UNIQUE (ID);
ALTER TABLE CANCELED ADD CONSTRAINT CANCELED_EVENT_FK FOREIGN KEY (EVENT_NO) REFERENCES EVENT(NO) ON DELETE SET NULL;
ALTER TABLE CANCELED ADD CONSTRAINT CANCELED_USER_ACCOUNT_FK FOREIGN KEY (USER_ACCOUNT_NO) REFERENCES USER_ACCOUNT(NO) ON DELETE SET NULL;
ALTER TABLE CANCELED ADD CONSTRAINT CANCELED_QT_CHK CHECK (QT > 0);

-- 메인페이지 배너 테이블 (BANNER)
CREATE TABLE BANNER (
    NO NUMBER(6) NOT NULL,
    EVENT_NO NUMBER(6),
    URL VARCHAR2(500) NOT NULL,
    SUB_DATE DATE DEFAULT SYSDATE NOT NULL
);

ALTER TABLE BANNER ADD CONSTRAINT BANNER_NO_PK PRIMARY KEY (NO);
ALTER TABLE BANNER ADD CONSTRAINT BANNER_EVENT_FK FOREIGN KEY (EVENT_NO) REFERENCES EVENT(NO) ON DELETE SET NULL;
ALTER TABLE BANNER ADD CONSTRAINT BANNER_URL_UQ UNIQUE (URL);


-- 테이블 생성 (USER_MANAGEMENT_EVENT)
CREATE TABLE USER_MANAGEMENT_EVENT (
    NO NUMBER(6) NOT NULL,  -- 기본키 (시퀀스 사용)
    PUBLIC_DATA_EVENT_NO NUMBER(38,0) NOT NULL,  -- 공공데이터 축제번호 (외래키)
    USER_ACCOUNT_NO NUMBER(6) NOT NULL,  -- 매니저 계정번호 (외래키)
    REG_DATE DATE DEFAULT SYSDATE NOT NULL -- 등록 날짜 (기본값 SYSDATE)
);

-- 제약 조건 추가
ALTER TABLE PUBLIC_DATA_EVENT ADD CONSTRAINT PUBLIC_DATA_EVENT_NO_PK PRIMARY KEY(NO);
ALTER TABLE USER_MANAGEMENT_EVENT ADD CONSTRAINT USER_MANAGEMENT_EVENT_NO_PK PRIMARY KEY (NO);
ALTER TABLE USER_MANAGEMENT_EVENT ADD CONSTRAINT USER_MANAGEMENT_EVENT_PUBLIC_EVENT_FK FOREIGN KEY (PUBLIC_DATA_EVENT_NO) REFERENCES PUBLIC_DATA_EVENT (NO);
ALTER TABLE USER_MANAGEMENT_EVENT ADD CONSTRAINT USER_MANAGEMENT_EVENT_USER_ACCOUNT_FK FOREIGN KEY (USER_ACCOUNT_NO) REFERENCES USER_ACCOUNT (NO);

--
