// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// .env에서 Firebase 설정값 불러오기
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase 인증 설정
const auth = getAuth(app);

// Firebase Storage 사용 설정
const storage = getStorage(app);

// // Firebase 인증 관련 함수
// const signUp = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     throw error;
//   }
// };

// const login = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     throw error;
//   }
// };

const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Firebase 스토리지 관련 함수
const uploadFile = (file, filePath) => {
  const storageRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      console.error("Error uploading file:", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    }
  );
};

const deleteFile = async (filePath) => {
  const storageRef = ref(storage, filePath);
  try {
    await deleteObject(storageRef);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

export {
  auth,
  // signUp,
  // login,
  onAuthStateChangedListener,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  uploadFile,
  deleteFile
};




// // src/firebase/firebaseConfig.js

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

// // .env에서 Firebase 설정값 불러오기
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
// };

// // Firebase 초기화
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Firebase Storage 사용 설정
// const storage = getStorage(app);

// export { storage, ref, uploadBytesResumable, getDownloadURL, deleteObject };



// // // src/firebase/firebaseConfig.js

// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";

// // // .env에서 Firebase 설정값 불러오기
// // const firebaseConfig = {
// //   apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
// //   authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
// //   projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
// //   storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
// //   messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
// //   appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
// //   measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
// // };

// // // Firebase 초기화
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// // // Firebase 초기화된 앱과 analytics 객체를 export
// // export { app, analytics };


// // import { initializeApp } from 'firebase/app';
// // import {
// //   getStorage,
// //   ref,
// //   uploadBytesResumable,
// //   getDownloadURL,
// //   deleteObject,
// // } from 'firebase/storage';

// // // 🔹 Firebase 설정 (Firebase 콘솔에서 가져오기)
// // const firebaseConfig = {
// //   apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
// //   authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
// //   projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
// //   storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
// //   messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
// //   appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
// //   measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
// // };

// // // Firebase 앱 초기화
// // const app = initializeApp(firebaseConfig);

// // // Firebase Storage 사용 설정
// // const storage = getStorage(app);

// // export { storage, ref, uploadBytesResumable, getDownloadURL, deleteObject };
