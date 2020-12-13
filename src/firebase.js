import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBm35gSgFnwfhVrhfkRXV0SEW3UiuyZFd0",
  authDomain: "messenger-764b7.firebaseapp.com",
  databaseURL: "https://messenger-764b7.firebaseio.com",
  projectId: "messenger-764b7",
  storageBucket: "messenger-764b7.appspot.com",
  messagingSenderId: "837392642043",
  appId: "1:837392642043:web:252c86bd41d73145e5a55e",
  measurementId: "G-31427ZMGQ0"
};

const firebaseApp =firebase.initializeApp(firebaseConfig)
const db= firebaseApp.firestore()
const auth=firebase.auth()
var provider = new firebase.auth.GoogleAuthProvider();
GoogleAuthProvider()
export default db
export {
    auth,provider
}