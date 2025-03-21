# VIVA-FESTA: 지역 축제 예매 사이트

> 공공데이터 API를 활용하여 지역 축제 예매 사이트. 사용자 및 관리자를 위한 다양한 기능을 제공하며, 결제 및 통계 조회 가능.

## 🙍‍♂️ 팀원
김민석 이태원 박소현 오승택 정건일

## 📆 기간 (약 3주 소요)
`2025. 2. 3. ~ 2025. 2. 24.`

## 📌 프로젝트 개요

VIVA-FESTA는 지역 축제 예매를 위한 프로젝트입니다. 공공데이터 API를 활용하여 지역 축제 정보를 제공하고, 예매, 회원가입, 결제, 관리자 및 매니저 기능을 구현했습니다. 주요 기술로는 Spring Framework, Java, JavaScript, 그리고 Node.js가 사용되었으며, 핵심적인 보안 기능으로 비밀번호 암호화 및 세션 관리가 포함되어 있습니다.

### 주요 기능
- **회원가입 및 수정**: 비밀번호는 `BCrypt`를 사용하여 안전하게 암호화합니다.
- **세션 관리**: 사용자의 세션이 만료되면 자동으로 로그아웃 처리됩니다.
- **결제 시스템**: `Toss Payments API`를 사용하여 결제를 처리합니다.
- **자동 스크롤**: 휠 스크롤을 사용하여 페이지 이동 기능을 구현하였습니다.
- **관리자 및 매니저 모드**: 관리자는 전체 사이트를 관리하고, 매니저는 자신의 축제를 관리할 수 있습니다.
- **통계**: 축제 예매 통계와 관련된 다양한 데이터를 시각화하여 제공합니다.

## 📌 기술 스택

<details>
<summary>기술 스택 보기</summary>

- **OS**: Windows 11 Home
- **DB 서버**: Oracle 21
- **JDK 버전**: jdk-23.0.1
- **WAS**: Apache Tomcat 9.0.97
- **Spring Framework**: 4.27.0.RELEASE
- **Node.js 버전**: 22.12.0
- **개발 언어**: Java, HTML5, CSS3, JQuery, JavaScript, XML, Ajax
- **데이터베이스 모델링 툴**: ERWin 7.3.0.1666, StarUML
- **IDE**: Eclipse 4.34.0.v20241120-1800
- **SQL Developer**: 24.3.0.284.2209

</details>

📌 주요 기능
<details> <summary>보기</summary>
회원가입 및 수정
사용자가 가입 시 비밀번호는 BCrypt로 암호화되어 저장됩니다.
회원 정보 수정 시, 비밀번호는 다시 암호화하여 처리합니다.
세션 관리
세션 만료 시간이 설정되어 있으며, 일정 시간이 지나면 자동으로 로그아웃됩니다.
세션 유지 시간 및 만료 시간은 서버 설정에서 조정 가능합니다.
결제 시스템
Toss Payments API를 사용하여 결제 기능을 구현했습니다.
결제 처리 중 발생할 수 있는 오류에 대비하여, 결제 취소 및 실패 시 처리가 가능합니다.
관리자 및 매니저 모드
관리자 페이지: 모든 축제를 관리하고, 회원 및 매니저 권한을 부여합니다.
매니저 페이지: 자신의 축제를 관리하고, 예매 현황을 확인할 수 있습니다.
통계
축제 예매 통계를 실시간으로 제공하며, 관리자는 축제별 예매 현황을 확인할 수 있습니다.
</details>

📌 핵심 기술
<details> <summary>보기</summary>
BCrypt: 회원가입 및 비밀번호 수정 시, 비밀번호를 안전하게 암호화하여 저장합니다.
세션 관리: 사용자의 세션이 만료되면 자동으로 로그아웃되도록 설정되어 있습니다.
휠 스크롤: 페이지 내에서 휠 스크롤을 사용하여 페이지 이동 기능을 구현하였습니다.
Toss Payments API: 안전한 결제 처리를 위한 API를 사용합니다.
</details>

📌 트러블슈팅
<details> <summary>보기</summary>
1. Toss Payments 결제 실패
결제 실패 시, API 호출 로그를 확인하여 오류 메시지를 추적하세요.
네트워크 문제나 API 키 설정이 잘못된 경우 결제에 실패할 수 있습니다.
2. 세션 만료 문제
세션 만료 시간이 지나도 로그아웃되지 않는 경우, web.xml 또는 Spring Security 설정에서 세션 관리 시간을 다시 확인해야 합니다.
브라우저의 캐시 문제로 로그아웃이 지연될 수 있습니다.
3. BCrypt 암호화 문제
BCrypt 암호화 방식에서 발생할 수 있는 문제는 주로 라이브러리 버전 문제입니다. 최신 버전의 spring-security-crypto 라이브러리를 사용하도록 하세요.
</details>

## 📽시연영상
https://www.youtube.com/watch?v=Sj1ueAkHz6E
