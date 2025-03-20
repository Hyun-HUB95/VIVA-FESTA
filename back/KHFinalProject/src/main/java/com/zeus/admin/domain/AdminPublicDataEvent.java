package com.zeus.admin.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdminPublicDataEvent {
	  	private Long no;
	    private String name; // 축제/이벤트 이름
	    private String place; // 개최 장소
	    private LocalDate startDate; // 시작 날짜
	    private LocalDate endDate; // 종료 날짜
	    private String content; // 행사 내용
	    private String governing; // 주관 기관
	    private String host; // 주최 기관
	    private String tel; // 연락처
	    private String homepage; // 홈페이지 URL
	    private String address; // 주소
	    private Double latitude; // 위도
	    private Double longitude; // 경도
}
