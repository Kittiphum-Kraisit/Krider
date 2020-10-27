import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCSXwr6F0OeJVo-xG9yeNYpXsZ6eNdi-W0",
  databaseURL: "https://rider-f8b23.firebaseio.com",
  projectId: "rider-f8b23",
  appId: "1:873781689239:android:74f04b9c1b4a752f99e2d2",
};

export default Firebase.initializeApp(firebaseConfig);
