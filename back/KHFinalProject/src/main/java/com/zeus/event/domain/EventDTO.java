package com.zeus.event.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class EventDTO {
    private int no;               // 시퀀스 (PK)
    private int publicDataEventNo; // 공공데이터 축제번호 (FK)
    private int userAccountNo;     // 작성자(매니저) (FK)
   private int price;         // 이용권 가격
    private Double rating;         // 평점
    private String thumbUrl; // 메인 이미지 URL (유니크)
    private List<String> url;
    
    
    // URL을 HTTP 형식으로 변환하는 메서드
    public void convertUrls() {
        // 썸네일 URL 변환 처리 (메인 이미지)
        if (thumbUrl != null) {
            // 로컬 경로에서 HTTP URL로 변환
            if (thumbUrl.startsWith("C:\\uploads\\event\\main\\")) {
                thumbUrl = "http://localhost:8080/uploads/event/main/"
                        + thumbUrl.substring("C:\\uploads\\event\\main\\".length()).replace("\\", "/");
            } else if (thumbUrl.startsWith("C:\\uploads\\event\\sub\\")) {
                thumbUrl = "http://localhost:8080/uploads/event/sub/"
                        + thumbUrl.substring("C:\\uploads\\event\\sub\\".length()).replace("\\", "/");
            }
        }

        // URL 리스트 변환 처리
        if (url != null) {
            for (int i = 0; i < url.size(); i++) {
                String imageUrl = url.get(i);

                if (imageUrl != null) {
                    // 로컬 경로에서 HTTP URL로 변환
                    if (imageUrl.startsWith("C:\\uploads\\event\\main\\")) {
                        imageUrl = "http://localhost:8080/uploads/event/main/"
                                + imageUrl.substring("C:\\uploads\\event\\main\\".length()).replace("\\", "/");
                    } else if (imageUrl.startsWith("C:\\uploads\\event\\sub\\")) {
                        imageUrl = "http://localhost:8080/uploads/event/sub/"
                                + imageUrl.substring("C:\\uploads\\event\\sub\\".length()).replace("\\", "/");
                    }
                    url.set(i, imageUrl); // 변환된 URL로 수정
                }
            }
        }
    }
    
}
