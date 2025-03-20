import { stringify } from 'uuid';
import { fetchWithAuth } from '../user/userApi';
import { customFetch } from '../../api/api';

const BASE_URL = 'http://localhost:8080/event';
const IMAGE_BASE_URL = 'http://localhost:8080/uploads/event/main'; // ✅ Add this line

/**
 * 이벤트 리스트 조회
 */
export const selectEventList = async (sortOption) => {
  try {
    const response = await fetch(
      `${BASE_URL}/selectEventList`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sortOption),
      }
    );
    const data = await response.json();
    // ✅ Update image URLs
    if (data.dataList) {
      data.dataList.forEach(event => {
        event.thumbUrl = `${IMAGE_BASE_URL}/${event.thumbUrl.split('\\').pop()}`;
      });
    }
    return data.dataList;
  } catch (error) {
    alert('오류가 발생했습니다. ' + error.message);
    throw error;
  }
};

/**
 * 이벤트 조회
 */
export const selectEventRead = async (no) => {
  try {
    const response = await customFetch(
      `${BASE_URL}/selectEventRead?&no=${no}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();

    // 이미지 경로를 웹에서 접근할 수 있는 경로로 수정
    const IMAGE_BASE_URL = 'http://localhost:8080/uploads/event/main'; // 로컬 서버의 이미지 URL

    if (data.dataList && data.dataList.thumburl) {
      let thumbUrl = data.dataList.thumburl;
      // 'c:\\uploads\\event\\main\\' 부분 제거
      if (thumbUrl.startsWith('c:\\uploads\\event\\main\\')) {
        thumbUrl = thumbUrl.replace('c:\\uploads\\event\\main\\', '');
      }
      // 경로 수정 후 적절한 URL로 변경
      // 이미지 URL 앞에 http://localhost:8080/uploads/event/main/이 없다면 추가
      if (!thumbUrl.startsWith('http://localhost:8080/uploads/event/main/')) {
        thumbUrl = `${IMAGE_BASE_URL}/${thumbUrl.replace(/\\/g, '/')}`;
      }
      data.dataList.thumburl = thumbUrl;
    }

    if (data.dataList && data.dataList.subImages && Array.isArray(data.dataList.subImages)) {
      data.dataList.subImages = data.dataList.subImages.map((img) => {
        // 'c:\\uploads\\event\\main\\' 및 'c:\\uploads\\event\\sub\\' 부분 제거
        if (img.startsWith('c:\\')) {
          img = img.replace('c:\\uploads\\event\\main\\', '')
                   .replace('c:\\uploads\\event\\sub\\', '')
                   .replace(/\\/g, '/');
        }
        return `${IMAGE_BASE_URL}/${img}`;
      });
    }

    return data.dataList;
  } catch (error) {
    console.error('오류가 발생했습니다. ' + error.message);
    throw error;
  }
};



// 성공
// export const selectEventRead = async (no) => {
//   try {
//     const response = await customFetch(
//       `${BASE_URL}/selectEventRead?&no=${no}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     const data = await response.json();

//     // 이미지 경로를 웹에서 접근할 수 있는 경로로 수정
//     const IMAGE_BASE_URL = 'http://localhost:8080/uploads/event/main'; // 로컬 서버의 이미지 URL

//     if (data.dataList && data.dataList.thumburl) {
//       let thumbUrl = data.dataList.thumburl;
//       // 'c:\\uploads\\event\\main\\' 부분 제거
//       if (thumbUrl.startsWith('c:\\uploads\\event\\main\\')) {
//         thumbUrl = thumbUrl.replace('c:\\uploads\\event\\main\\', '');
//       }
//       // 경로 수정 후 적절한 URL로 변경
//       data.dataList.thumburl = `${IMAGE_BASE_URL}/${thumbUrl.replace(/\\/g, '/')}`;
//     }

//     if (data.dataList && data.dataList.subImages && Array.isArray(data.dataList.subImages)) {
//       data.dataList.subImages = data.dataList.subImages.map((img) => {
//         // 'c:\\uploads\\event\\main\\' 및 'c:\\uploads\\event\\sub\\' 부분 제거
//         if (img.startsWith('c:\\')) {
//           img = img.replace('c:\\uploads\\event\\main\\', '')
//                    .replace('c:\\uploads\\event\\sub\\', '')
//                    .replace(/\\/g, '/');
//         }
//         return `${IMAGE_BASE_URL}/${img}`;
//       });
//     }

//     return data.dataList;
//   } catch (error) {
//     console.error('오류가 발생했습니다. ' + error.message);
//     throw error;
//   }
// };


/**
 * 이벤트 삭제
 */
export const deleteEvent = async (userNo, eventNo) => {
  try {
    const response = await fetch(`${BASE_URL}/deleteEvent`, {
      method: 'DELETE',
      credentials: 'include', // ✅ 쿠키 자동 포함
      body: JSON.stringify({
        userAccountNo: userNo,
        no: eventNo,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    alert(data.message);
    return data.state;
  } catch (error) {
    alert('게시글 삭제가 불가능합니다.');
  }
};

/**
 * 장바구니 추가
 */
export const insertEventToCart = async (formData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/insertEventToCart`,
      {
        method: 'POST',
        credentials: 'include', // ✅ 쿠키 자동 포함
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    alert(data.message);
    return data.state;
  } catch (error) {
    alert('장바구니 추가에 실패했습니다.');
  }
};

/**
 * 이벤트 리뷰 조회
 */
export const selectEventReview = async (no, page) => {
  try {
    const response = await fetch(
      `${BASE_URL}/selectEventReview?page=${page}&no=${no}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    alert('오류가 발생했습니다. ' + error.message);
    throw error;
  }
};

/**
 * 댓글입력
 */
export const insertEventReview = async (formData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/insertEventReview`,
      {
        method: 'POST',
        credentials: 'include', // ✅ 쿠키 자동 포함
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    alert(data.message);
  } catch (error) {
    alert('리뷰 등록에 실패했습니다.');
  }
};

/**
 * 댓글삭제
 */
export const deleteEventReview = async (userNo, reviewNo) => {
  try {
    const response = await fetch(
      `${BASE_URL}/deleteEventReview`,
      {
        method: 'DELETE',
        credentials: 'include', // ✅ 쿠키 자동 포함
        body: JSON.stringify({
          userAccountNo: userNo,
          no: reviewNo,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    alert(data.message);
  } catch (error) {
    alert('리뷰 삭제가 불가능합니다.');
  }
};
