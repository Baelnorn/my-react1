import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmpbEwYfViBIFyol9l3vASvAuAMEanGoI",
  authDomain: "gamelist-ede75.firebaseapp.com",
  databaseURL: "https://gamelist-ede75-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gamelist-ede75",
  storageBucket: "gamelist-ede75.appspot.com",
  messagingSenderId: "1016108445026",
  appId: "1:1016108445026:web:c9baeebc4c23d856d9d03b",
  measurementId: "G-QB44783WJG",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;