import { useState, useEffect, useContext } from 'react';
import { Context } from '../../Context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Container, Form, Button, Modal, ProgressBar } from 'react-bootstrap';
import { insertEventByManager, selectPublicDataEvent, uploadImageToLocal } from './managerApi';
import { useNavigate } from 'react-router-dom';

const ManagerInsert = () => {
  const navigate = useNavigate();
  const { getDarkModeHover, getDarkMode } = useContext(Context);
  const [festivalList, setFestivalList] = useState([]); // 공공데이터 축제 리스트
  const [selectedFestival, setSelectedFestival] = useState(''); // 선택한 축제
  const [selectedFestivalNo, setSelectedFestivalNo] = useState(''); // 선택한 축제 번호
  const [ticketPrice, setTicketPrice] = useState(''); // 티켓 가격 추가
  const [mainImage, setMainImage] = useState(null); // 대표 이미지
  const [subImages, setSubImages] = useState([]); // 서브 이미지 리스트 (최대 20장)
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // 업로드 진행 상황
  const [uploadedFiles, setUploadedFiles] = useState(0); // 업로드된 파일 수
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부

  // ✅ 공공데이터 API에서 축제 리스트 가져오기
  useEffect(() => {
    const getSelectPublicDataEvent = async () => {
      const PublicList = await selectPublicDataEvent();
      setFestivalList(PublicList);
    };
    getSelectPublicDataEvent();
  }, []);

  // ✅ 대표 이미지 업로드 핸들러
  const handleMainImageChange = (e) => {
    if (e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  // ✅ 서브 이미지 업로드 핸들러
  const handleSubImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (subImages.length + files.length > 20) {
      alert('최대 20장까지 업로드할 수 있습니다.');
      return;
    }
    setSubImages([...subImages, ...files]);
  };

  // ✅ 선택한 서브 이미지 삭제
  const removeSubImage = (index) => {
    setSubImages(subImages.filter((_, i) => i !== index));
  };

  // ✅ 티켓 가격 입력 핸들러 (숫자만 입력 가능, 최대값 제한)
  const handleTicketPriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 1000000)) {
      setTicketPrice(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFestival || !mainImage || ticketPrice === '') {
      alert('축제, 대표 이미지, 티켓 가격을 입력해야 합니다.');
      return;
    }

    try {
      setUploading(true);
      setShowModal(true);

      // ✅ 대표 이미지 로컬 업로드 후 경로 가져오기
      const thumbUrl = await uploadImageToLocal(mainImage, 'main');
      setUploadedFiles((prev) => prev + 1);

      // ✅ 서브 이미지 로컬 업로드 후 경로 가져오기
      const url = await Promise.all(
        subImages.map((file) =>
          uploadImageToLocal(file, 'sub').then((filePath) => {
            setUploadedFiles((prev) => prev + 1);
            return filePath; // ✅ 경로 반환!
          })
        )
      );

      // ✅ 로컬에서 받은 경로만 백엔드에 전송
      const formData = {
        publicDataEventNo: selectedFestivalNo,
        price: ticketPrice,
        thumbUrl,
        url,
      };
      const flag = await insertEventByManager(formData);
      if (flag) {
        alert('축제가 등록되었습니다.');
        navigate('/eventList');
      }
    } catch (error) {
      console.error('업로드 중 오류 발생:', error);
    } finally {
      setUploading(false);
      setShowModal(false);
    }
  };

  // ✅ 축제 선택 핸들러
  const handleSelectChange = (e) => {
    setSelectedFestival(e.target.value);
    setSelectedFestivalNo(e.target.value);
    console.log(selectedFestivalNo);
  };

  return (
    <>
      <Header />
      <Container className={getDarkMode()}>
        <h2 className="mb-4">축제 등록</h2>
        <Form onSubmit={handleSubmit}>
          {/* ✅ 축제 선택 */}
          <Form.Group className="mb-3">
            <Form.Label>축제 선택</Form.Label>
            <Form.Select
              value={selectedFestival}
              onChange={(e) => {
                handleSelectChange(e);
              }}
              required
            >
              <option value="">축제를 선택하세요</option>
              {festivalList.map((festival) => (
                <option key={festival.no} value={festival.publicDataEventNo}>
                  {festival.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* ✅ 티켓 가격 입력 */}
          <Form.Group className="mb-3">
            <Form.Label>
              티켓 가격 (무료축제의 경우 0 입력해 주세요){' '}
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="0 ~ 1,000,000원"
              value={ticketPrice}
              onChange={handleTicketPriceChange}
              min="0"
              max="1000000"
              required
            />
          </Form.Group>

          {/* ✅ 대표 이미지 업로드 */}
          <Form.Group className="mb-3">
            <Form.Label>대표 이미지 업로드</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              required
            />
          </Form.Group>

          {/* ✅ 서브 이미지 업로드 */}
          <Form.Group className="mb-3">
            <Form.Label>서브 이미지 업로드 (최대 20장)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              multiple
              onChange={handleSubImagesChange}
            />
            <div className="mt-2">
              {subImages.map((image, index) => (
                <div
                  key={index}
                  className="d-inline-block position-relative me-2"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`서브 이미지 ${index + 1}`}
                    width={80}
                    height={80}
                    className="rounded"
                  />
                  <Button
                    size="sm"
                    variant="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                    onClick={() => removeSubImage(index)}
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
          </Form.Group>
          <br />
          {/* ✅ 제출 버튼 */}
          <Button
            type="submit"
            variant="primary"
            className={` ${getDarkModeHover()} w-100`}
          >
            {uploading ? '업로드 중...' : '축제 등록'}
          </Button>
        </Form>
      </Container>
      <Footer />

      {/* ✅ 업로드 진행 상황 모달 */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>업로드 진행 중</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
          <div className="mt-3">
            {uploadedFiles} / {subImages.length + 1} 파일 업로드 완료
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ManagerInsert;
