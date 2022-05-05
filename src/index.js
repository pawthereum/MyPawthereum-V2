import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";
import QuickStart from "components/QuickStart";
import 'antd/dist/antd.variable.min.css';
import { ConfigProvider } from 'antd';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged, 
  connectAuthEmulator,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBmbss75NwVjMpupWnJFYSH6qj6n4YrhJc",
  authDomain: "mypawth.firebaseapp.com",
  projectId: "mypawth",
  storageBucket: "mypawth.appspot.com",
  messagingSenderId: "880107643145",
  appId: "1:880107643145:web:e5545b2b7069c5d1c3f3d8",
  measurementId: "G-80L5EH47JZ"
})

getAnalytics(firebaseApp)
const auth = getAuth()
const db = getFirestore()

if (process.env.NODE_ENV !== 'production') {
  connectAuthEmulator(auth, "http://localhost:9099")
  connectFirestoreEmulator(db, 'localhost', 8080)
}

ConfigProvider.config({
  theme: {
    primaryColor: '#ff65b3',
    errorColor: '#f03c4b',
  },
});

/** Get your free Moralis Account https://moralis.io/ */

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  //Validate
  if(!APP_ID || !SERVER_URL) throw new Error("Missing Moralis Application ID or Server URL. Make sure to set your .env file.");
  if (isServerInfo)
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <ConfigProvider>
          <App isServerInfo />
        </ConfigProvider>
      </MoralisProvider>
    );
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <QuickStart />
      </div>
    );
  }
};

onAuthStateChanged(auth, (user) => {
  if (!user) return signInAnonymously(auth)

  setPersistence(auth, browserSessionPersistence)
  ReactDOM.render(
    // <React.StrictMode>
    <Application />,
    // </React.StrictMode>,
    document.getElementById("root")
  );
})

