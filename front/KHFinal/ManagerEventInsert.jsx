import React, { useState } from 'react';
import { uploadImageToLocalServer } from './firebaseUtils';

const ManagerEventInsert = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const filename = await uploadImageToLocalServer(image);
      const imageUrl = `http://localhost:5173/uploads/${filename}`;
      // 이미지 URL을 사용하여 이벤트를 삽입하는 로직 추가
      console.log('Image URL:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ManagerEventInsert;