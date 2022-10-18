import { useDispatch } from "react-redux";

import { db } from "..";
import {
    collection,
    query,
    getDocs,
    deleteDoc,
    setDoc,
    doc,
  } from "firebase/firestore"

export const useTocartTools = (getTocarts,setUrl,setName,setPrice,tocart,addTocartBasket,addCount) =>{
const dispatch = useDispatch();
const addTocart = (price, name, url, id) => {
    const basket = {
      price,
      name,
      url,
      count: 1,
      id,
    };
    const findElem = tocart.findIndex((el) => el.id === basket.id);
    findElem === -1
      ? dispatch(addTocartBasket(basket))
      : dispatch(addCount(findElem));
  };
//   const deleteTocartHome = async (id) => {
//     await deleteDoc(doc(db, "test", `${id}`));
//     getTocarts();
//   };
  const adminToolAddTocart = async (url,name,price) => {
    if (url && name && price !== "") {
      const keyCollection = Date.now();
      await setDoc(doc(db, "test", `${keyCollection}`), {
        url: url,
        title: name,
        price: price,
        id: keyCollection,
        comment: [],
      });
      setUrl("");
      setName("");
      setPrice("");
      getTocarts();
    }
}
return [addTocart,adminToolAddTocart]
  };


  export const useGetTocarts = (removeTocart,adminAddTocart) =>{
    const dispatch = useDispatch();
    const getTocarts = async () => {
        dispatch(removeTocart([]));
        const q = query(collection(db, "test"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          dispatch(adminAddTocart(doc.data()));
        });
        
      };
      const deleteTocartHome = async (id) => {
        await deleteDoc(doc(db, "test", `${id}`));
        getTocarts();
      };
      return{getTocarts,deleteTocartHome}
  }