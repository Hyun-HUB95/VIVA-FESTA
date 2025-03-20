package com.zeus.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    public static final String ALLOWED_METHOD_NAMES = "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH";

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("http://localhost:5173") // ✅ 특정 도메인만 허용
                .allowedMethods(ALLOWED_METHOD_NAMES.split(","))
                .allowCredentials(true) // ✅ 쿠키 포함 요청 허용
                .allowedHeaders("*")
                .exposedHeaders("Authorization"); // ✅ JWT가 담긴 Authorization 헤더 노출
        
        registry.addMapping("/uploads/**").allowedOrigins("http://localhost:5173"); // 해당 URL을 적절히 수정
    }


//    // 정적 파일 제공 설정 (이미지 파일)
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        // 로컬 업로드 폴더 경로 매핑
//        registry.addResourceHandler("/uploads/**")
//                .addResourceLocations("file:/C:/uploads/"); // 로컬 경로에서 파일 제공
//    }
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
	      
    	registry.addResourceHandler("/uploads/**")
	      		.addResourceLocations("file:/C:/uploads/"); // 로컬 경로에서 파일 제공
    	
        // 로컬 업로드 폴더 경로 매핑 (메인 이미지, 서브 이미지)
        registry.addResourceHandler("/uploads/event/main/**")
                .addResourceLocations("file:/C:/uploads/event/main/"); // 로컬 경로에서 파일 제공

        registry.addResourceHandler("/uploads/event/sub/**")
                .addResourceLocations("file:/C:/uploads/event/sub/"); // 로컬 경로에서 파일 제공
    }
}