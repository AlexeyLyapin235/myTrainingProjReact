import { doc, updateDoc, arrayUnion ,setDoc,collection, getDocs } from "firebase/firestore";
import { db } from "../index.js";




export const addComent = async(data,id) =>{
  const commetsRef = doc(db, "test", `${id}`);
  await updateDoc(commetsRef, {
    comment: arrayUnion(data),
  })
}
export const addUser =  async(data,uid) =>{
  await setDoc(doc(db, "users", `${uid}`), data);
}
export const  getUsers = async(callback) =>{
  const querySnapshot = await getDocs(collection(db, "users"));
  const arr = [];
  querySnapshot.forEach((doc) => {
  arr.push(doc.data());
  callback([...arr])
  });
}

