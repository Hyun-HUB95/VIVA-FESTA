/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
// multer 설정: 파일을 로컬의 C:/upload 폴더에 저장
const upload = multer({ dest: 'C:/upload/' });

app.use(cors());
app.use(express.json());

// 파일 업로드 엔드포인트
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const targetPath = path.join('C:/upload', file.originalname);

  // 업로드된 파일을 지정된 경로로 이동
  fs.rename(file.path, targetPath, (err) => {
    if (err) {
      console.error('Error saving image:', err);
      return res.status(500).send('Error saving image');
    }
    res.json({ message: 'File uploaded successfully', filename: file.originalname });
  });
});

// 업로드된 파일을 제공하는 엔드포인트
app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join('C:/upload', filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(404).send('File not found');
    }
  });
});

// 서버 시작
app.listen(5173, () => {
  console.log('Proxy server running on http://localhost:5173');
});
