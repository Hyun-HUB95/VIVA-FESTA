import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './css/StartFestival.css';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function StartFestival() {
  const navigate = useNavigate();
  const [comeStartEvents, setcomeStartEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/event/thumbnail')
      .then(response => {
        setcomeStartEvents(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching event thumbnails:', error);
      });
  }, []);

  const handleImageClick = (no) => {
    navigate(`/eventRead/${no}`);
  };

  const getCorrectedImageUrl = (thumbUrl) => {
    if (!thumbUrl) return ''; // thumbUrl이 undefined인 경우 빈 문자열 반환
    // 'C:/uploads' 경로를 'http://localhost:8080/uploads'로 변환하고 공백을 '%20'으로 치환
    let correctedUrl = thumbUrl.replace(/^.*[\\\/]/, ''); // 경로에서 파일명만 추출
    correctedUrl = `http://localhost:8080/uploads/event/main/${correctedUrl}`;
    correctedUrl = correctedUrl.replace(/ /g, '%20');  // 공백을 '%20'으로 변환
    return correctedUrl;
  };

  const items = comeStartEvents.map((event, index) => (
    <div
      className="carousel-item StartFestival-item"
      key={index}
      onClick={() => handleImageClick(event.no)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={getCorrectedImageUrl(event.thumbUrl)}
        alt={`Item ${index + 1}`}
        className="carousel-image StartFestival-image"
      />
      <br />
      <h5>
        {event.name.length > 20
          ? `${event.name.substring(0, 20)}...`
          : event.name}
      </h5>
    </div>
  ));

  const responsive = {
    0: { items: 1 },
    800: { items: 2 },
    1024: { items: 5 },
  };

  return (
    <>
      <br />
      <h3 className="StartFestival-name">&ensp;시작하는 축제</h3>
      <div className="carousel-container StartFestival-container">
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          autoPlay
          autoPlayInterval={5000}
          infinite
          disableDotsControls={true}
          disableButtonsControls={false}
        />
      </div>
      <hr />
      <br />
    </>
  );
}

export default StartFestival;
