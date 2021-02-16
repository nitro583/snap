// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// Firebaseアプリ（コアFirebase SDK）は常に必要であり、
//他のFirebaseSDKの前にリストする必要があります
import firebase from "firebase/app";

// Add the Firebase services that you want to use
//使用するFirebaseサービスを追加します
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
// TODO：以下をアプリのFirebaseプロジェクト構成に置き換えます
// Firebase JavaScript SDK v7.20.0以降の場合、 `measurementId`はオプションのフィールドです
var firebaseConfig = {
  apiKey: "AIzaSyCPinrTCgMU_IOEiU5krb5lVbP7mAdHCZk",
  authDomain: "snapxsnap.firebaseapp.com",
  databaseURL: "https://snapxsnap-default-rtdb.firebaseio.com",
  projectId: "snapxsnap",
  storageBucket: "snapxsnap.appspot.com",
  messagingSenderId: "364563945953",
  appId: "1:364563945953:web:ba9091f03c0bdf70a69aa0",
  measurementId: "G-NRGBTP9KS6"
};

// Initialize Firebase
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}


