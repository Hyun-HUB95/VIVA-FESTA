import React, { useState } from 'react';
import { uploadImageToFirebase } from './firebaseUtils';

const ManagerEventInsert = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const imageUrl = await uploadImageToFirebase(file);
        console.log('Image uploaded successfully:', imageUrl);
        // ...existing code...
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default ManagerEventInsert;
