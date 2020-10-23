import * as firebase from "firebase";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREDB,
  authDomain: "fir-electron-stocks.firebaseapp.com",
  databaseURL: "https://fir-electron-stocks.firebaseio.com",
  projectId: "fir-electron-stocks",
  storageBucket: "fir-electron-stocks.appspot.com",
  messagingSenderId: "66136711525",
  appId: "1:66136711525:web:b36821d6a7665ff135c18c",
};
// Initialize Firebase
let firebaseDB = firebase.initializeApp(firebaseConfig);

export default firebaseDB.database();
