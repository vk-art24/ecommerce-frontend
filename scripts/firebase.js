import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjEmrwKjMriUXlkkHSTsk2RnraN_2HMSM",
  authDomain: "e-commerce-96790.firebaseapp.com",
  projectId: "e-commerce-96790",
  storageBucket: "e-commerce-96790.firebasestorage.app",
  messagingSenderId: "792811593838",
  appId: "1:792811593838:web:30c50ed0c99488386ac67f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);