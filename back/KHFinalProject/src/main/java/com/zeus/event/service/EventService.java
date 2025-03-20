package com.zeus.event.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventReview;
import com.zeus.event.domain.EventSelectListDTO;
import com.zeus.event.domain.EventSelectReadDTO;
import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.event.domain.SortDTO;
import com.zeus.user.domain.Cart;
import com.zeus.user.domain.User;

public interface EventService {
	// 공공데이터를 db에서 가져와서 반환해주는 서비스 인터페이스
	List<PublicDataEventDTO> selectPublicDataEvent(User user);

	// 이벤트 리스트
	List<EventSelectListDTO> selectEventList(SortDTO sortDTO);

	// 이벤트 리스트 페이지네이션 개수
	// 이벤트 조회
	EventSelectReadDTO selectEventRead(SortDTO sortDTO);

	// 이벤트 리뷰 조회
	List<EventReview> selectEventReview(SortDTO sortDTO);

	// 이벤트 리뷰 평균 평점계산
	Double selectEventReviewRating(SortDTO sortDTO);

	// 이벤트 리뷰 페이지네이션
	int selectEventReviewCount(SortDTO sortDTO);

	// 리뷰 인서트
	boolean insertEventReview(EventReview eventReview);

	// 리뷰 삭제
	boolean deleteEventReview(EventReview eventReview);

	// 축제 게시글 삭제
	boolean deleteEvent(EventDTO eventDTO);

	// 축제 티켓 장바구니에등록
	boolean insertEventToCart(Cart cart);
	//월별 리스트 출력을 위해서
	List<EventSelectListDTO> selectEventListMonth(SortDTO sortDTO);
	//카트에 항목 추가전 중복되는 항목이 있는지 확인 중복되는항목 있으면 false 반환해야함
	boolean cartDuplCheck(Cart cart);
	//예매한 축제인지 확인
	boolean checkReserved(EventReview eventReview);
	//댓글이 있는지 확인
	boolean checkReplyAlready(EventReview eventReview);
	//가격이 0원이면 true
	boolean checkEventPrice(EventReview eventReview);
	void fetchAndSaveEvents() throws  Exception; // 공공데이터 API 호출 후 DB 저장

	
	
	
	// 이벤트 썸네일 이미지 경로 수정 (파일 업로드 후 경로 수정)
	String saveFile(MultipartFile file);

	// 이벤트 썸네일 URL을 수정하는 메서드 추가
	boolean updateEventThumbUrl(EventDTO event);

	// 이벤트 업데이트 메서드에 URL 수정 로직 포함
	boolean updateEvent(EventDTO event);
}
