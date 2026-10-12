import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSezCGPg5keoA6p9vC_LkoetskXyRHYyU",
  authDomain: "aeroporto-para-todos.firebaseapp.com",
  databaseURL: "https://aeroporto-para-todos-default-rtdb.firebaseio.com",
  projectId: "aeroporto-para-todos",
  storageBucket: "aeroporto-para-todos.firebasestorage.app",
  messagingSenderId: "490910040341",
  appId: "1:490910040341:web:7b15283311fe473da4691c"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

export async function conectarFirebase() {
  await signInAnonymously(auth);
}