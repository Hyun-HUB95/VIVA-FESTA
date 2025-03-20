package com.zeus.event.domain;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventSelectReadDTO {
	private EventSelectRead eventSelectRead;
	private List<String> url;
	
	
	
	
	
	 // 추가: 변환된 이미지 URL을 저장할 리스트
    private List<String> imageUrls;
    
//    // 이미지 URL을 변환하는 메서드
//    public void convertUrlsToHttp() {
//        this.imageUrls = new ArrayList<>();
//        
//        // url 리스트가 null이 아니고, 각 경로를 처리할 수 있을 때만 진행
//        if (this.url != null) {
//            for (String filePath : this.url) {
//                if (filePath.startsWith("event/main")) {
//                    // main 이미지 경로
//                    this.imageUrls.add("/uploads/event/main/" + filePath);
//                } else if (filePath.startsWith("event/sub")) {
//                    // sub 이미지 경로
//                    this.imageUrls.add("/uploads/event/sub/" + filePath);
//                } else {
//                    // 다른 경우
//                    this.imageUrls.add("/uploads/" + filePath);  // 기본 경로 설정
//                }
//            }
//        }
//    }
    
    
// // 이미지 URL을 HTTP URL로 변환하는 메서드 추가
//    public void convertUrlsToHttp() {
//        if (this.thumburl != null && this.thumburl.startsWith("C:\\uploads\\event\\main\\")) {
//            // Windows 로컬 파일 경로를 HTTP URL로 변환
//            String httpUrl = "http://localhost:8080/uploads/event/main/" + this.thumburl.substring("C:\\uploads\\event\\main\\".length());
//            this.thumburl = httpUrl;
//        }
//    }
    
    
    
//    public void convertUrlsToHttp() {
//        // 첫 번째 URL 처리 (eventSelectRead.getThumburl() 처리)
//        if (this.eventSelectRead != null && this.eventSelectRead.getThumburl() != null && !this.eventSelectRead.getThumburl().isEmpty()) {
//            String thumbUrl = this.eventSelectRead.getThumburl();
//            System.out.println("Thumb URL (before conversion): " + thumbUrl);  // 디버깅을 위한 출력
//
//            if (thumbUrl.startsWith("C:\\uploads\\event\\main\\")) {
//                String httpUrl = "http://localhost:8080/uploads/event/main/" + thumbUrl.substring("C:\\uploads\\event\\main\\".length());
//                this.eventSelectRead.setThumburl(httpUrl);
//                System.out.println("Thumb URL (after conversion): " + httpUrl);  // 디버깅을 위한 출력
//            }
//        } else {
//            System.out.println("No thumb URL or it is empty.");  // 디버깅: URL이 없거나 비어있는 경우
//        }
//
//        // 두 번째 URL 리스트 처리 (this.url 처리)
//        if (this.url != null && !this.url.isEmpty()) {
//            for (int i = 0; i < this.url.size(); i++) {
//                String url = this.url.get(i);
//                System.out.println("URL at index " + i + " (before conversion): " + url);  // 디버깅을 위한 출력
//
//                if (url != null && !url.isEmpty() && url.startsWith("C:\\uploads\\event\\main\\")) {
//                    String httpUrl = "http://localhost:8080/uploads/event/main/" + url.substring("C:\\uploads\\event\\main\\".length());
//                    this.url.set(i, httpUrl);
//                    System.out.println("URL at index " + i + " (after conversion): " + httpUrl);  // 디버깅을 위한 출력
//                }
//            }
//        } else {
//            System.out.println("URL list is empty or null.");  // 디버깅: URL 리스트가 비어있거나 null인 경우
//        }
//    }


//    public void convertUrlsToHttp() {
//        // 첫 번째 URL 처리 (eventSelectRead.getThumburl() 처리)
//        if (this.eventSelectRead != null && this.eventSelectRead.getThumburl() != null && !this.eventSelectRead.getThumburl().isEmpty()) {
//            String thumbUrl = this.eventSelectRead.getThumburl();
//            System.out.println("Thumb URL (before conversion): " + thumbUrl);
//
//            if (thumbUrl.startsWith("C:\\uploads\\event\\main\\")) {
//                String httpUrl = "http://localhost:8080/uploads/event/main/" + thumbUrl.substring("C:\\uploads\\event\\main\\".length());
//                this.eventSelectRead.setThumburl(httpUrl);
//                System.out.println("Thumb URL (after conversion): " + httpUrl);
//            } else if (thumbUrl.startsWith("C:\\uploads\\event\\sub\\")) {
//                String httpUrl = "http://localhost:8080/uploads/event/sub/" + thumbUrl.substring("C:\\uploads\\event\\sub\\".length());
//                this.eventSelectRead.setThumburl(httpUrl);
//                System.out.println("Thumb URL (after conversion): " + httpUrl);
//            }
//        } else {
//            System.out.println("No thumb URL or it is empty.");
//        }
//
//        // 두 번째 URL 리스트 처리 (this.url 처리)
//        if (this.url != null && !this.url.isEmpty()) {
//            for (int i = 0; i < this.url.size(); i++) {
//                String url = this.url.get(i);
//                System.out.println("URL at index " + i + " (before conversion): " + url);
//
//                if (url != null && !url.isEmpty()) {
//                    if (url.startsWith("C:\\uploads\\event\\main\\")) {
//                        String httpUrl = "http://localhost:8080/uploads/event/main/" + url.substring("C:\\uploads\\event\\main\\".length());
//                        this.url.set(i, httpUrl);
//                        System.out.println("URL at index " + i + " (after conversion): " + httpUrl);
//                    } else if (url.startsWith("C:\\uploads\\event\\sub\\")) {
//                        String httpUrl = "http://localhost:8080/uploads/event/sub/" + url.substring("C:\\uploads\\event\\sub\\".length());
//                        this.url.set(i, httpUrl);
//                        System.out.println("URL at index " + i + " (after conversion): " + httpUrl);
//                    }
//                }
//            }
//        } else {
//            System.out.println("URL list is empty or null.");
//        }
//    }


    // 성공
//    public void convertUrlsToHttp() {
//        // 변환된 URL을 imageUrls 리스트에 추가
//        this.imageUrls = new ArrayList<>();
//
//        // 첫 번째 URL 처리 (thumburl 변환)
//        if (this.eventSelectRead != null && this.eventSelectRead.getThumburl() != null && !this.eventSelectRead.getThumburl().isEmpty()) {
//            String thumbUrl = this.eventSelectRead.getThumburl();
//            System.out.println("Thumb URL (before conversion): " + thumbUrl);
//
//            if (thumbUrl.startsWith("C:\\uploads\\event\\main\\")) {
//                String httpUrl = "http://localhost:8080/uploads/event/main/" + thumbUrl.substring("C:\\uploads\\event\\main\\".length());
//                this.eventSelectRead.setThumburl(httpUrl);
//                this.imageUrls.add(httpUrl); // imageUrls에 추가
//                System.out.println("Thumb URL (after conversion): " + httpUrl);
//            } else if (thumbUrl.startsWith("C:\\uploads\\event\\sub\\")) {
//                String httpUrl = "http://localhost:8080/uploads/event/sub/" + thumbUrl.substring("C:\\uploads\\event\\sub\\".length());
//                this.eventSelectRead.setThumburl(httpUrl);
//                this.imageUrls.add(httpUrl); // imageUrls에 추가
//                System.out.println("Thumb URL (after conversion): " + httpUrl);
//            }
//        } else {
//            System.out.println("No thumb URL or it is empty.");
//        }
//
//        // 두 번째 URL 리스트 처리 (this.url 처리)
//        if (this.url != null && !this.url.isEmpty()) {
//            for (int i = 0; i < this.url.size(); i++) {
//                String url = this.url.get(i);
//                System.out.println("URL at index " + i + " (before conversion): " + url);
//
//                if (url != null && !url.isEmpty()) {
//                    if (url.startsWith("C:\\uploads\\event\\main\\")) {
//                        String httpUrl = "http://localhost:8080/uploads/event/main/" + url.substring("C:\\uploads\\event\\main\\".length());
//                        this.url.set(i, httpUrl);
//                        this.imageUrls.add(httpUrl); // imageUrls에 추가
//                        System.out.println("URL at index " + i + " (after conversion): " + httpUrl);
//                    } else if (url.startsWith("C:\\uploads\\event\\sub\\")) {
//                        String httpUrl = "http://localhost:8080/uploads/event/sub/" + url.substring("C:\\uploads\\event\\sub\\".length());
//                        this.url.set(i, httpUrl);
//                        this.imageUrls.add(httpUrl); // imageUrls에 추가
//                        System.out.println("URL at index " + i + " (after conversion): " + httpUrl);
//                    }
//                }
//            }
//        } else {
//            System.out.println("URL list is empty or null.");
//        }
//    }
    
//    public void convertUrlsToHttp() {
//        // 이미지 URL 리스트 초기화
//        this.imageUrls = new ArrayList<>();
//
//        // 썸네일 URL 변환 처리 (메인 이미지)
//        if (this.eventSelectRead != null && this.eventSelectRead.getThumburl() != null && !this.eventSelectRead.getThumburl().isEmpty()) {
//            String thumbUrl = this.eventSelectRead.getThumburl().trim();  // 공백 제거하여 정확한 URL 확인
//            System.out.println("썸네일 URL (변환 전): " + thumbUrl);
//
//            // 이미 HTTP URL인 경우 그대로 사용
//            if (thumbUrl.startsWith("http://localhost:8080/uploads/event/main/")) {
//                // 이미 HTTP URL이면 그대로 사용
//                this.imageUrls.add(thumbUrl);  
//                System.out.println("썸네일 URL (이미 HTTP): " + thumbUrl);
//            } 
//            // 로컬 경로가 포함된 경우 처리
//            else if (thumbUrl.startsWith("C:\\uploads\\event\\main\\")) {
//                // 로컬 경로에서 HTTP URL로 변환
//                String httpUrl = "http://localhost:8080/uploads/event/main/"
//                                 + thumbUrl.substring("C:\\uploads\\event\\main\\".length()).replace("\\", "/");  // 백슬래시를 슬래시로 변환
//                this.eventSelectRead.setThumburl(httpUrl);  // 썸네일 URL 수정
//                this.imageUrls.add(httpUrl);  // 이미지 URL 리스트에 추가
//                System.out.println("썸네일 URL (변환 후): " + httpUrl);
//            } 
//            // 기타 다른 URL 처리 로직
//            else {
//                System.out.println("썸네일 URL이 알 수 없는 형식입니다.");
//            }
//        } else {
//            System.out.println("썸네일 URL이 없거나 비어 있습니다.");
//        }
//
//        // 추가적인 URL 리스트 처리
//        if (this.url != null && !this.url.isEmpty()) {
//            for (int i = 0; i < this.url.size(); i++) {
//                String url = this.url.get(i).trim();  // 공백 제거하여 정확한 URL 확인
//                System.out.println("URL (인덱스 " + i + ", 변환 전): " + url);
//
//                if (url != null && !url.isEmpty()) {
//                    if (url.startsWith("C:\\uploads\\event\\main\\")) {
//                        // 로컬 경로에서 HTTP URL로 변환
//                        String httpUrl = "http://localhost:8080/uploads/event/main/"
//                                         + url.substring("C:\\uploads\\event\\main\\".length()).replace("\\", "/");  // 백슬래시를 슬래시로 변환
//                        this.url.set(i, httpUrl);  // URL 리스트에서 수정
//                        this.imageUrls.add(httpUrl);  // 이미지 URL 리스트에 추가
//                        System.out.println("URL (인덱스 " + i + ", 변환 후): " + httpUrl);
//                    }
//                    else if (url.startsWith("C:\\uploads\\event\\sub\\")) {
//                        // 로컬 경로에서 HTTP URL로 변환
//                        String httpUrl = "http://localhost:8080/uploads/event/sub/"
//                                         + url.substring("C:\\uploads\\event\\sub\\".length()).replace("\\", "/");
//                        this.url.set(i, httpUrl);  // URL 리스트에서 수정
//                        this.imageUrls.add(httpUrl);  // 이미지 URL 리스트에 추가
//                        System.out.println("URL (인덱스 " + i + ", 변환 후): " + httpUrl);
//                    }
//                }
//            }
//        } else {
//            System.out.println("URL 리스트가 비어 있거나 null입니다.");
//        }
//    }

    
    public void convertUrlsToHttp() {
        // 이미지 URL 리스트 초기화
        this.imageUrls = new ArrayList<>();

        // 썸네일 URL 변환 처리 (메인 이미지)
        if (this.eventSelectRead != null && this.eventSelectRead.getThumburl() != null && !this.eventSelectRead.getThumburl().isEmpty()) {
            String thumbUrl = this.eventSelectRead.getThumburl().trim().toLowerCase();  // 대소문자 구분 없이 비교
            System.out.println("썸네일 URL (변환 전): " + thumbUrl);

            // 이미 HTTP URL인 경우 로컬 경로 부분을 제거하고 백슬래시를 슬래시로 변환
            if (thumbUrl.startsWith("http://localhost:8080/uploads/event/main/")) {
                // 로컬 경로 부분을 제거하여 올바른 URL로 반환
                String httpUrl = thumbUrl.replace("c:\\uploads\\event\\main\\", "").replace("\\", "/");
                this.imageUrls.add(httpUrl);  
                System.out.println("썸네일 URL (이미 HTTP): " + httpUrl);
            } 
            // 로컬 경로가 포함된 경우 처리
            else if (thumbUrl.startsWith("c:\\uploads\\event\\main\\".toLowerCase())) {
                // 로컬 경로에서 HTTP URL로 변환
                String httpUrl = "http://localhost:8080/uploads/event/main/" 
                                 + thumbUrl.substring("c:\\uploads\\event\\main\\".length()).replace("\\", "/");
                this.eventSelectRead.setThumburl(httpUrl);  // 썸네일 URL 수정
                this.imageUrls.add(httpUrl);  // 이미지 URL 리스트에 추가
                System.out.println("썸네일 URL (변환 후): " + httpUrl);
            } 
            // 기타 다른 URL 처리 로직
            else {
                System.out.println("썸네일 URL이 알 수 없는 형식입니다.");
            }
        } else {
            System.out.println("썸네일 URL이 없거나 비어 있습니다.");
        }

        // 추가적인 URL 리스트 처리
        if (this.url != null && !this.url.isEmpty()) {
            for (int i = 0; i < this.url.size(); i++) {
                String url = this.url.get(i).trim().toLowerCase();  // 대소문자 구분 없이 비교
                System.out.println("URL (인덱스 " + i + ", 변환 전): " + url);

                if (url != null && !url.isEmpty()) {
                    if (url.startsWith("c:\\uploads\\event\\main\\".toLowerCase())) {
                        // 로컬 경로에서 HTTP URL로 변환
                        String httpUrl = "http://localhost:8080/uploads/event/main/"
                                         + url.substring("c:\\uploads\\event\\main\\".length()).replace("\\", "/");
                        this.url.set(i, httpUrl);  // URL 리스트에서 수정
                        this.imageUrls.add(httpUrl);  // 이미지 URL 리스트에 추가
                        System.out.println("URL (인덱스 " + i + ", 변환 후): " + httpUrl);
                    }
                    else if (url.startsWith("c:\\uploads\\event\\sub\\".toLowerCase())) {
                        // 로컬 경로에서 HTTP URL로 변환
                        String httpUrl = "http://localhost:8080/uploads/event/sub/"
                                         + url.substring("c:\\uploads\\event\\sub\\".length()).replace("\\", "/");
                        this.url.set(i, httpUrl);  // URL 리스트에서 수정
                        this.imageUrls.add(httpUrl);  // 이미지 URL 리스트에 추가
                        System.out.println("URL (인덱스 " + i + ", 변환 후): " + httpUrl);
                    }
                }
            }
        } else {
            System.out.println("URL 리스트가 비어 있거나 null입니다.");
        }
    }

}
