// 로컬 경로를 절대 URL로 수정하는 함수
const fixImageUrl = (url) => {
  if (url && url.startsWith('C:/uploads')) {
    // 'C:/uploads'를 'http://localhost:8080'으로 변환
    let fixedUrl = url.replace('C:/uploads', 'http://localhost:8080');
    
    // 경로 내 공백을 '%20'으로 변환
    fixedUrl = fixedUrl.replace(/ /g, '%20');
    
    console.log("Fixed URL: ", fixedUrl); // 디버깅: 변환된 URL 확인
    
    return fixedUrl;
  }
  return url; // 이미 절대 경로인 경우 그대로 반환
};

export const lateNotices = async () => {
  try {
    const response = await fetch(`http://localhost:8080/notice/lateNotices`);
    if (!response.ok) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }
    const data = await response.json();

    // 각 항목의 이미지 URL을 수정
    if (data && Array.isArray(data)) {
      data.forEach(item => {
        item.thumbUrl = fixImageUrl(item.thumbUrl); // 이미지 URL 변환
      });
    }

    return data;
  } catch (error) {
    console.error(`lateNotices를 불러오는 중 오류 발생:`, error);
    return null;
  }
};

export const topSeries = async () => {
  try {
    const response = await fetch(`http://localhost:8080/main/topSeries`);
    if (!response.ok) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }
    const data = await response.json();

    // 각 항목의 이미지 URL을 수정
    if (data && Array.isArray(data)) {
      data.forEach(item => {
        item.thumbUrl = fixImageUrl(item.thumbUrl); // 이미지 URL 변환
      });
    }

    return data;
  } catch (error) {
    console.error(`top4를 불러오는 중 오류 발생:`, error);
    return null;
  }
};

export const byRegionRate = async () => {
  try {
    const response = await fetch(`http://localhost:8080/main/byRegionRate`);
    if (!response.ok) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }
    const data = await response.json();

    // 이미지 URL 수정
    if (data && Array.isArray(data)) {
      data.forEach(item => {
        item.thumbUrl = fixImageUrl(item.thumbUrl); // 이미지 URL 변환
      });
    }

    return data;
  } catch (error) {
    console.error(`byRegionRate를 불러오는 중 오류 발생:`, error);
    return null;
  }
};

export const comeStartDate = async () => {
  try {
    const response = await fetch(`http://localhost:8080/main/comeStartDate`);
    if (!response.ok) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }
    const data = await response.json();

    // 이미지 URL 수정
    if (data && Array.isArray(data)) {
      data.forEach(item => {
        item.thumbUrl = fixImageUrl(item.thumbUrl); // 이미지 URL 변환
      });
    }

    return data;
  } catch (error) {
    console.error(`comeStartDate를 불러오는 중 오류 발생:`, error);
    return null;
  }
};

export const comeEndDate = async () => {
  try {
    const response = await fetch(`http://localhost:8080/main/comeEndDate`);
    if (!response.ok) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }
    const data = await response.json();

    // 이미지 URL 수정
    if (data && Array.isArray(data)) {
      data.forEach(item => {
        item.thumbUrl = fixImageUrl(item.thumbUrl); // 이미지 URL 변환
      });
    }

    return data;
  } catch (error) {
    console.error(`comeEndDate를 불러오는 중 오류 발생:`, error);
    return null;
  }
};

export const bannerImage = async () => {
  try {
    const response = await fetch(`http://localhost:8080/main/bannerImage`);
    if (!response.ok) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }
    const data = await response.json();

    // 이미지 URL 수정
    if (data && Array.isArray(data)) {
      data.forEach(item => {
        item.thumbUrl = fixImageUrl(item.thumbUrl); // 이미지 URL 변환
      });
    }

    return data;
  } catch (error) {
    console.error(`bannerImage를 불러오는 중 오류 발생:`, error);
    return null;
  }
};
