import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './css/ByRegionFestival.css';
import { byRegionRate } from '../mainApi.js';
import useEmblaCarousel from 'embla-carousel-react';
import axios from 'axios';

const ByRegionFestival = () => {
  const navigate = useNavigate();
  const [byRegionEvents, setbyRegionEvents] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchbyRagionRate = async () => {
      const data = await byRegionRate();
      if (data) {
        setbyRegionEvents(data);
      }
    };
    fetchbyRagionRate();
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

  const getCorrectedImageUrl = (thumbUrl) => {
    if (!thumbUrl) return ''; // thumbUrl이 undefined인 경우 빈 문자열 반환
    // 'C:/uploads' 경로를 'http://localhost:8080/uploads'로 변환하고 공백을 '%20'으로 치환
    let correctedUrl = thumbUrl.replace(/^.*[\\\/]/, ''); // 경로에서 파일명만 추출
    correctedUrl = `http://localhost:8080/uploads/event/main/${correctedUrl}`;
    correctedUrl = correctedUrl.replace(/ /g, '%20');  // 공백을 '%20'으로 변환
    return correctedUrl;
  };

  const carouselItems = byRegionEvents.map((event, index) => (
    <div
      className="carousel-item ByRegionFestival-item"
      key={index}
      onClick={() => handleImageClick(event.no)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={getCorrectedImageUrl(event.thumbUrl)}
        alt={event.name}
        className="carousel-image ByRegionFestival-image"
      />
      <br />
      <h5>
        {event.name.length > 20
          ? `${event.name.substring(0, 18)}...`
          : event.name}
      </h5>
    </div>
  ));

  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 5 },
  };
  return (
    <>
      <br />
      <h3 className="ByRegionFestival-name">&ensp;지역Best</h3>
      <div className="carousel-container ByRegionFestival-container">
        <AliceCarousel
          mouseTracking
          items={carouselItems}
          responsive={responsive}
          autoPlay
          autoPlayInterval={5000}
          infinite
          disableDotsControls={true}
          disableButtonsControls={false}
        />
      </div>
    </>
  );
}

export default ByRegionFestival;
