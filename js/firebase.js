// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js'
import { getFirestore, collection, doc, getDocs, addDoc, setDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js'
//  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwq9hNSEeTCGzgSKTmeGs_Kr8ZoMnJBEA",
  authDomain: "graph-animals.firebaseapp.com",
  projectId: "graph-animals",
  storageBucket: "graph-animals.appspot.com",
  messagingSenderId: "451804260169",
  appId: "1:451804260169:web:c15786be1614e3a3535c98",
  measurementId: "G-WS9ZV1V4GQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//  const analytics = getAnalytics(app);

const getCollection = async (nameCollection)=> {
  const drawCol = collection(db, nameCollection);
  const drawSnapshot = await getDocs(drawCol);
  const drawList = drawSnapshot.docs.map(doc => {
    const obj = { id: doc.id, ...doc.data() }
    return obj
  });

  return drawList;
}



const addNewDoc = async (nameCollection, id, newData) => {
      if(!id){
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, nameCollection), newData);
        return docRef;
      }
      // Add a new document in collection "draw"
      await setDoc(doc(db, nameCollection, id), newData);
}

const deleteFraw = async (id)=>{
  const nameCollection = "fraw";
  await deleteDoc(doc(db, nameCollection, id));
  alert("Archivo Eliminado.... ",id);
}



export { db, doc ,getCollection, addNewDoc, deleteFraw }