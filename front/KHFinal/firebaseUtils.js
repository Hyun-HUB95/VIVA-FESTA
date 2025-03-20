/* eslint-disable no-undef */
const axios = require('axios');
const FormData = require('form-data');

const uploadImageToFirebase = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(
      `https://firebasestorage.googleapis.com/v0/b/project-viva-festa.appspot.com/o?name=events%2Fmain%2F${file.name}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export async function uploadImageToLocalServer(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:5173/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data.filename;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

module.exports = {
  uploadImageToFirebase,
};