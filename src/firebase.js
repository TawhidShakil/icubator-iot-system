// src/firebase.js
import { initializeApp } from 'firebase/app';
// 'child' ফাংশনটি import করা হলো
import { getDatabase, ref, onValue, set, child } from 'firebase/database'; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzzPe0gc_MbYDLunyG1ANQG6ELsPS353Y",
  authDomain: "incubator-iot-system.firebaseapp.com",
  databaseURL: "https://incubator-iot-system-default-rtdb.firebaseio.com", 
  projectId: "incubator-iot-system",
  storageBucket: "incubator-iot-system.firebasestorage.app",
  messagingSenderId: "900271513840",
  appId: "1:900271513840:web:c3115809c8b37432326235"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// আমরা incubator_101 ডাটা ব্যবহার করব
const incubatorRef = ref(database, 'incubators/incubator_101'); 
const controlsRef = ref(database, 'incubators/incubator_101/controls');

// 'child' ফাংশনটি export করা হলো
export { database, incubatorRef, controlsRef, onValue, set, ref, child };