import { useState, useContext, useRef, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  Spinner,
} from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Context } from '../../Context'; // 다크모드 컨텍스트 적용
import './css/EventRead.css'; // CSS 파일 추가
import { useNavigate, useParams } from 'react-router-dom';
import ReviewSection from './include/ReivewSection';
import MapSection from './include/MapSection';
import { ButtonDarkMode, ButtonRoleAndUserNo } from '../../components/ui';
import { deleteEvent, insertEventToCart, selectEventRead } from './eventApi';
import CartModalPage from './include/CartModalPage';
import { deleteImageFromFirebase } from '../../utils/firebaseUtils';

const EventRead = () => {
  const param = useParams();
  const nav = useNavigate();
  const [eventInfo, setEventInfo] = useState({});
  const [cart, setCart] = useState({ qt: 1 });
  const [ticketCount, setTicketCount] = useState(1);
  const { getDarkMode, getDarkModeHover } = useContext(Context); // 다크모드 적용
  const [mainImage, setMainImage] = useState(''); // ✅ 현재 메인 이미지 상태
  const [subImages, setSubImages] = useState([]); // ✅ 서브 이미지 상태
  const [mainImageHeight, setMainImageHeight] = useState(0); // Add state for main image height
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const eventData = async () => {
      const response = await selectEventRead(param.no);
      const eventSelectRead = response.eventSelectRead;
  
      // 'thumbUrl' 값 확인
      let imageUrl = eventSelectRead.thumburl; // thumbUrl 대소문자 확인
      console.log("Thumb URL (before conversion):", imageUrl); // thumbUrl 확인
  
      // 로컬 경로에서 HTTP 경로로 변환
      if (imageUrl && imageUrl.includes('c:\\uploads\\event\\main\\')) {
        imageUrl = imageUrl.replace('c:\\uploads\\event\\main\\', 'http://localhost:8080/uploads/event/main/');
      }
  
      // 백슬래시를 슬래시로 변환
      imageUrl = imageUrl.replace(/\\/g, '/');
  
      // 이미 'http://localhost:8080/uploads/event/main/'이 포함되어 있다면 중복을 막습니다.
      if (imageUrl && imageUrl.startsWith('http://localhost:8080/uploads/event/main/')) {
        imageUrl = imageUrl.replace('http://localhost:8080/uploads/event/main/http://localhost:8080/uploads/event/main/', 'http://localhost:8080/uploads/event/main/');
      }
  
      // 파일명을 인코딩
      const fileName = imageUrl.split('/').pop(); // 파일명만 추출
      const encodedFileName = encodeURIComponent(fileName); // 파일명만 인코딩
      imageUrl = imageUrl.replace(fileName, encodedFileName); // 인코딩된 파일명으로 교체
  
      console.log("Converted Image URL:", imageUrl); // 변환된 URL 확인
  
      if (imageUrl && imageUrl !== "undefined") {
        setMainImage(imageUrl); // 변환된 URL을 그대로 사용
      }
  
      // 서브 이미지들 설정
      const convertedSubImages = response.url.map(img => {
        if (img && img.startsWith('C:\\')) {
          // 'C:\\uploads\\event\\main\\'과 'C:\\uploads\\event\\sub\\' 경로를 HTTP URL로 변환
          img = img
            .replace(/^C:\\uploads\\event\\main\\/, 'http://localhost:8080/uploads/event/main/')
            .replace(/^C:\\uploads\\event\\sub\\/, 'http://localhost:8080/uploads/event/sub/')
            .replace(/\\/g, '/');
        }
  
        return img;
      });
  
      setSubImages(convertedSubImages);
      setEventInfo(eventSelectRead);
      setIsLoading(false);
    };
  
    eventData();
  }, [param.no]);
  
  
  

  
  
  
  
  
  

  // 장바구니 담기
  useEffect(() => {
    setCart({ eventNo: eventInfo.no, qt: ticketCount });
  }, [ticketCount, eventInfo.no]);

  const scrollRef = useRef(null);
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -120, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 120, behavior: 'smooth' });
    }
  };

  const handleIncrease = () => setTicketCount(ticketCount + 1);
  const handleDecrease = () => {
    if (ticketCount > 1) setTicketCount(ticketCount - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = async () => {
    try {
      // ✅ 메인 이미지 삭제
      await deleteImageFromFirebase(mainImage);

      // ✅ 서브 이미지 삭제 (배열로 처리)
      await Promise.all(subImages.map((img) => deleteImageFromFirebase(img)));

      // ✅ 데이터베이스에서 이벤트 삭제
      const response = await deleteEvent(eventInfo.userAccountNo, eventInfo.no);
      if (response) {
        console.log('✅ 이벤트가 DB에서 삭제됨');
        nav('/eventList');
      }
    } catch (error) {
      console.error('❌ 이벤트 삭제 중 오류 발생', error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleCart = async () => {
    // 장바구니 담기 API 호출
    const response = await insertEventToCart(cart);
    // 모달 표시
    if (response) {
      setShowModal(true);
    }
  };

  const handleImageLoad = (e) => {
    setMainImageHeight(e.target.offsetHeight);
  };

  return (
    <>
      <Header page="list" />
      <Container className={`EventReadTitle-container ${getDarkMode()}`}>
        {isLoading ? (
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Row className="align-items-center">
              {/* 📌 좌측: 메인 이미지 + 서브 이미지 */}
              <Col md={7} className="position-relative p-0 m-0">
              <Card className="border-0 align-items-center mb-2 h-100 p-0 m-0" style={{ marginTop: '1rem' }}>
    <div
      style={{
        height: '100%', // 100% 높이로 설정하여 부모 요소에 맞추기
        overflow: 'hidden',
        position: 'relative',
        margin: 0, // 여백 제거
        padding: 0, // 패딩 제거
      }}
    >
      <img
        src={mainImage}
        alt="Main Event"
        className="img-fluid rounded EventReadTitle-main-image fade-in"
        onLoad={handleImageLoad}
        onError={(e) => {
          e.target.src = ''; // 이미지 경로를 빈 문자열로 설정하여 로딩하지 않도록 함
          e.target.alt = 'Main Image'; // 대체 텍스트 설정
          e.target.style.backgroundColor = '#f0f0f0'; // 배경색 설정 (이미지 자리가 빈 상태일 때 보이게 하기)
          e.target.style.display = 'flex'; // 대체 텍스트를 보이게 하기 위해 display flex로 설정
          e.target.style.justifyContent = 'center'; // 텍스트를 중앙에 배치
          e.target.style.alignItems = 'center'; // 세로로 텍스트 중앙 정렬
          e.target.style.height = '100%'; // 높이를 100%로 설정하여 대체 텍스트가 보이게 함
          e.target.style.width = '100%'; // 너비를 100%로 설정
          e.target.innerHTML = 'Main Image'; // 대체 텍스트를 표시
        }}
        style={{
          width: '100%', // 이미지 너비를 100%로 설정
          height: '100%', // 이미지 높이를 100%로 설정
          objectFit: 'cover', // 이미지가 비율을 유지하면서 컨테이너를 꽉 채우도록 설정
          display: 'block', // 블록 요소로 처리하여 가운데 정렬 가능
          margin: 0, // 여백 제거
          padding: 0, // 패딩 제거
          top: 0, // 여백 제거
        }}
      />
    </div>
  </Card>


                {/* ✅ 서브 이미지: 좌우 버튼으로 이동 */}
                <div className="event-sub-images position-relative align-items-center">
                  <div className="EventReadTitle-container-sub">
                    {/* 좌측 버튼 */}
                    <Button
                      variant="none"
                      className={`EventReadTitle-scroll-button EventReadTitle-scroll-left ${getDarkModeHover()}`}
                      onClick={scrollLeft}
                    >
                      ◀
                    </Button>

                    <div
                      ref={scrollRef}
                      className="d-flex w-100 mt-2 overflow-hidden EventReadTitle-sub-container ms-1 me-1"
                      style={{
                        whiteSpace: 'nowrap',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        position: 'relative',
                      }}
                    >
                      {subImages.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Sub ${index + 1}`}
                          className="EventReadTitle-sub-image"
                          onClick={() => setMainImage(img)}
                          style={{
                            boxShadow:
                              mainImage === img
                                ? '0px 4px 8px rgba(0, 0, 0, 0.2)'
                                : 'none',
                            opacity: mainImage === img ? '0.6' : '1',
                          }}
                        />
                      ))}
                    </div>

                    {/* 우측 버튼 */}
                    <Button
                      variant="none"
                      className={`EventReadTitle-scroll-button EventReadTitle-scroll-right ${getDarkModeHover()}`}
                      onClick={scrollRight}
                    >
                      ▶
                    </Button>
                  </div>
                </div>
              </Col>

              {/* 📌 우측: 축제 정보 + 예매 */}
              <Col
                md={5}
                className="d-flex flex-column justify-content-center p-4"
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="EventReadTitle-title me-5 text-nowrap">
                    {eventInfo.name}
                  </h2>
                  <ButtonRoleAndUserNo
                    text="삭제"
                    userNo={eventInfo.userAccountNo}
                    role="manager"
                    onClick={() => handleDelete()}
                  />
                </div>
                <p className="EventReadTitle-location">
                  <strong>장소 :</strong> {eventInfo.place}
                </p>
                <p className="EventReadTitle-dates">
                  <strong>일정 :</strong> {eventInfo.startDate} ~{' '}
                  {eventInfo.endDate}
                </p>
                <p className="EventReadTitle-content">{eventInfo.content}</p>
                <hr />
                <p className="EventReadTitle-host">
                  <strong>주최 :</strong> {eventInfo.host} /{' '}
                  <strong>주관 :</strong> {eventInfo.governing}
                </p>
                <p className="EventReadTitle-contact">
                  <strong>문의 :</strong>{' '}
                  <a href={`tel:${eventInfo.tel}`}>{eventInfo.tel}</a>
                </p>
                <p className="EventReadTitle-homepage">
                  <strong>공식 홈페이지 :</strong>{' '}
                  <a
                    href={eventInfo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {eventInfo.homepage || '-'}
                  </a>
                </p>
                {/* 🎟 티켓 수량 선택 */}
                <div className={`border p-3 rounded mb-3 ${getDarkMode()} div`}>
                  {new Date(eventInfo.endDate) < new Date() ? (
                    // ✅ 종료된 축제
                    <div className="text-center p-4">
                      <h4 className="text-danger fw-bold">축제 종료</h4>
                      <p className={`mb-2 text-muted ${getDarkMode()} span`}>
                        이 축제는 종료된 축제로, 예매가 불가능합니다.
                      </p>
                    </div>
                  ) : eventInfo.price === 0 ? (
                    // ✅ 무료 입장 가능
                    <div className="text-center p-4">
                      <h4 className="text-success fw-bold">무료 입장 가능</h4>
                      <p className={`mb-2 text-muted ${getDarkMode()} span`}>
                        이 축제는 별도의 입장권 없이 누구나 자유롭게 즐길 수
                        있습니다!
                      </p>
                    </div>
                  ) : (
                    // ✅ 가격이 있을 때 (기존 UI 유지)
                    <>
                      <p className={`mb-2 ${getDarkMode()} span`}>
                        가격 :{' '}
                        <strong>
                          {Number(eventInfo.price).toLocaleString()}원
                        </strong>
                      </p>
                      <ButtonGroup className="mb-3">
                        <Button
                          className={`btn-outline-secondary ${getDarkModeHover()} EventReadTitle-ticket-btn`}
                          onClick={handleDecrease}
                          variant="none"
                        >
                          -
                        </Button>
                        <span className="fs-4 px-3 EventReadTitle-ticket-count">
                          {ticketCount}
                        </span>
                        <Button
                          className={`btn-outline-secondary ${getDarkModeHover()} EventReadTitle-ticket-btn`}
                          onClick={handleIncrease}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                      <h5 className="mb-2">
                        합계 :{' '}
                        <strong>
                          {(ticketCount * eventInfo.price).toLocaleString()}원
                        </strong>
                      </h5>
                      <Button
                        className={`btn-primary w-100 ${getDarkModeHover()} EventReadTitle-cart-btn`}
                        onClick={handleCart}
                      >
                        🛒 장바구니 담기
                      </Button>
                    </>
                  )}
                </div>
              </Col>
            </Row>
            {/* 리뷰 창과 맵 */}
            <Row>
              <Col md={7}>
                <ReviewSection
                  rating={eventInfo.rating}
                  eventNo={eventInfo.no}
                />
              </Col>
              <Col md={5}>
                <MapSection
                  LATITUDE={eventInfo.latitude}
                  LONGITUDE={eventInfo.longitude}
                />
              </Col>
            </Row>
          </>
        )}
      </Container>
      <CartModalPage showModal={showModal} setShowModal={setShowModal} />
      <Footer />
    </>
  );
};

export default EventRead;