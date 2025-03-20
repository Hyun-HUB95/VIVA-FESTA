import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './css/Top4.css';
import { useNavigate } from 'react-router-dom';
import { topSeries } from '../mainApi.js';
import axios from 'axios';

export default function Top4() {
  const navigate = useNavigate();
  const [top4Events, setTop4Events] = useState([]); // API 데이터를 저장할 state
  const [items, setItems] = useState([]);

  // topSeries 데이터를 불러오는 함수
  useEffect(() => {
    const fetchTopSeries = async () => {
      const data = await topSeries();
      if (data) {
        setTop4Events(data);
      }
    };
    fetchTopSeries();
  }, []);

  useEffect(() => {
    axios.get('/api/event/thumbnail')
      .then(response => {
        setItems(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching event thumbnails:', error);
      });
  }, []);

  const handleImageClick = (no) => {
    navigate(`/eventRead/${no}`);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

   // 로컬 파일 경로를 웹 서버 URL로 변환하는 함수
   const getCorrectedImageUrl = (thumbUrl) => {
    console.log('Original Image URL:', thumbUrl);  // 디버깅: 로드하려는 이미지 URL 출력

    if (thumbUrl) {
      // 'C:/uploads' 경로를 'http://localhost:8080/uploads'로 변환하고 공백을 '%20'으로 치환
      let correctedUrl = thumbUrl.replace(/^.*[\\\/]/, ''); // 경로에서 파일명만 추출
      correctedUrl = `http://localhost:8080/uploads/event/main/${correctedUrl}`;
      correctedUrl = correctedUrl.replace(/ /g, '%20');  // 공백을 '%20'으로 변환

      console.log('Corrected Image URL:', correctedUrl);  // 디버깅: 변경된 URL 확인

      return correctedUrl;
    }
    return ''; // 만약 thumbUrl이 없다면 빈 문자열 반환
  };

  const getCorrectedSrc = (src) => {
    if (!src) return ''; // src가 undefined인 경우 빈 문자열 반환
    // 'c:/uploads/event/main/' 부분을 제거하고 올바른 경로로 수정
    let correctedSrc = src.replace(/^.*[\\\/]/, ''); // 경로에서 파일명만 추출
    return correctedSrc;
  };

  return (
    <>
      <div className="Top4-head">
        {top4Events.length === 4 ? (
          <>
            {/* 첫 번째 카드 */}
            <div className="Top4-left">
              <Card
                key={top4Events[0].no}
                className="bg-dark text-black Top4-card"
                style={{
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  border: 'none',
                }}
                onClick={() => handleImageClick(top4Events[0].no)}
              >
                <Card.Img
                  src={getCorrectedImageUrl(top4Events[0].thumbUrl)} // 수정된 URL 사용
                  alt="Card image 1"
                  className="top4-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectPosition: 'center',
                    cursor: 'pointer',
                  }}
                />
                <Card.ImgOverlay>
                  <div className="Top4-card-overlay">
                    <Card.Title
                      className="Top4-card-name"
                      style={{ fontSize: '1.5rem' }}
                    >
                      {truncateText(top4Events[0].name, 18)}
                    </Card.Title>
                    <h3
                      className="Top4-card-address"
                      style={{ fontSize: '1rem' }}
                    >
                      {top4Events[0].address || '주소 정보 없음'}
                    </h3>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </div>

            <div className="Top4-right">
              <div className="Top4-rightTop">
                <Card
                  key={top4Events[1].no}
                  className="bg-dark text-black Top4-card"
                  style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                  onClick={() => handleImageClick(top4Events[1].no)}
                >
                  <Card.Img
                    src={getCorrectedImageUrl(top4Events[1].thumbUrl)} // 수정된 URL 사용
                    alt="Card image 2"
                    className="top4-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectPosition: 'center',
                      cursor: 'pointer',
                    }}
                  />
                  <Card.ImgOverlay>
                    <div className="Top4-card-overlay">
                      <Card.Title
                        className="Top4-card-name"
                        style={{ fontSize: '1.25rem' }}
                      >
                        {truncateText(top4Events[1].name, 18)}
                      </Card.Title>
                      <h4
                        className="Top4-card-address"
                        style={{ fontSize: '0.875rem' }}
                      >
                        {top4Events[1].address || '주소 정보 없음'}
                      </h4>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </div>
              <div className="Top4-rightBottom">
                <div className="Top4-bottom-left">
                  <Card
                    key={top4Events[2].no}
                    className="bg-dark text-black Top4-card"
                    style={{
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                    onClick={() => handleImageClick(top4Events[2].no)}
                  >
                    <Card.Img
                      src={getCorrectedImageUrl(top4Events[2].thumbUrl)} // 수정된 URL 사용
                      alt="Card image 3"
                      className="top4-image"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectPosition: 'center',
                        cursor: 'pointer',
                      }}
                    />
                    <Card.ImgOverlay>
                      <div className="Top4-card-overlay">
                        <Card.Title
                          className="Top4-card-name"
                          style={{ fontSize: '1.25rem' }}
                        >
                          {truncateText(top4Events[2].name, 18)}
                        </Card.Title>
                        <h4
                          className="Top4-card-address"
                          style={{ fontSize: '0.875rem' }}
                        >
                          {top4Events[2].address || '주소 정보 없음'}
                        </h4>
                      </div>
                    </Card.ImgOverlay>
                  </Card>
                </div>
                <div className="Top4-bottom-right">
                  <Card
                    key={top4Events[3].no}
                    className="bg-dark text-black Top4-card"
                    style={{
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                    onClick={() => handleImageClick(top4Events[3].no)}
                  >
                    <Card.Img
                      src={getCorrectedImageUrl(top4Events[3].thumbUrl)} // 수정된 URL 사용
                      alt="Card image 4"
                      className="top4-image"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectPosition: 'center',
                        cursor: 'pointer',
                      }}
                    />
                    <Card.ImgOverlay>
                      <div className="Top4-card-overlay">
                        <Card.Title
                          className="Top4-card-name"
                          style={{ fontSize: '1.25rem' }}
                        >
                          {truncateText(top4Events[3].name, 18)}
                        </Card.Title>
                        <h4
                          className="Top4-card-address"
                          style={{ fontSize: '0.875rem' }}
                        >
                          {top4Events[3].address || '주소 정보 없음'}
                        </h4>
                      </div>
                    </Card.ImgOverlay>
                  </Card>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        {items.map((item, index) => {
          const imageUrl = `http://localhost:8080/uploads/event/main/${getCorrectedImageUrl(item.thumbnail)}`;
          return (
            <div key={index}>
              <img 
                className="card-img-top EventListViewWrap-card-img" 
                src={imageUrl} 
                alt={`Event Thumbnail ${index}`} 
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
