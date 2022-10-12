import React from "react";
import CardTocart from "../components/UI/CardTocart/CardTocart";
import { useSelector, useDispatch } from "react-redux";
import {
  addTocartBasket,
  addCount,
  adminAddTocart,
  removeTocart,
  setChat
} from "../store/reduxToolkit/myStore";
import { getDatabase, ref, set ,onValue} from "firebase/database";
import AddTocartHome from "../components/adminTools/AddTocartHome";
import cl from "./Home.module.css";
import { useState } from "react";
import SearchInput from "../components/UI/input/SearchInput";
import { useEffect } from "react";
import DropDawfFilter from "../components/UI/dropdown/DropDown";
import PaginatedButton from "../components/UI/buttons/PaginatedButton";
import { useMemo } from "react";
import { db } from "../index.js";
import {
  collection,
  query,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import Chat from "../components/Chat";
import OpenRealTimeChat from "../components/OpenRealTimeChat";

const Home = () => {
  const getTocarts = async () => {
    dispatch(removeTocart([]));
    const q = query(collection(db, "test"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      dispatch(adminAddTocart(doc.data()));
    });
  };

  useEffect(() => {
    getTocarts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const chat = useSelector((state) => state.myState.chat);
  const tocart = useSelector((state) => state.myState.basketState);
  const myAdmin = useSelector((state) => state.myState.admin);
  const tocartHome = useSelector((state) => state.myState.tocart);
  const userEmail = useSelector((state)=> state.myState.email)
  const dispatch = useDispatch();
  const [sortTocart, setSortTocart] = useState("");
  const [search, setSearch] = useState("");
  const [newTocartUrl, setUrl] = useState("");
  const [newTocartName, setName] = useState("");
  const [newTocartPrice, setPrice] = useState("");
  const [rezervTocart, setRezervTocart] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [tocarPerPage] = useState(5);
  const totalPageCount = [];
  useEffect(() => {
    watchPaginated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tocartHome, currentPage]);

  const watchPaginated = async () => {
    const lastIndex = currentPage * tocarPerPage;
    const firsIndex = lastIndex - tocarPerPage;
    const paginatedArr = await tocartHome.slice(firsIndex, lastIndex);
    setRezervTocart(paginatedArr);
  };

  const paginations = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (search !== "") {
      const filtered = tocartHome.filter((el) =>
        el.title.toLowerCase().includes(search.toLocaleLowerCase())
      );
      setRezervTocart(filtered);
    } else {
      setRezervTocart(tocartHome);
      watchPaginated()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useMemo(() => {
    const count = tocartHome.length;
    const total = Math.ceil(count / 5);
    for (let i = 0; i < total; i++) {
      totalPageCount.push(i);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rezervTocart]);

  useEffect(() => {
    if (sortTocart === "Цена по увелечению") {
      const sorted = rezervTocart
        .slice()
        .sort((a, b) => (Number(a.price) > Number(b.price) ? 1 : -1));
      setRezervTocart(sorted);
    }
    if (sortTocart === "Цена по уменьшению") {
      const sortedMin = rezervTocart
        .slice()
        .sort((a, b) => (Number(a.price) < Number(b.price) ? 1 : -1));
      setRezervTocart(sortedMin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortTocart]);

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
  const deleteTocartHome = async (id) => {
   await deleteDoc(doc(db, "test", `${id}`));
    getTocarts();
  };
  const adminToolAddTocart = async () => {
    if (newTocartUrl && newTocartName && newTocartPrice !== "") {
      const keyCollection = Date.now();
      await setDoc(doc(db, "test", `${keyCollection}`), {
        url: newTocartUrl,
        title: newTocartName,
        price: newTocartPrice,
        id: keyCollection,
      });
      setUrl("");
      setName("");
      setPrice("");
      getTocarts();
    }
  };
const [message,setMessage] = useState("");
const [messages , setMessages] = useState([]);
const dbs = getDatabase();
const starCountRef = ref(dbs,'users/');
const filter = (data) =>{ 
  const arr = []
  for(let key in data){
    let obj = {
      emai:data[key].email,
      mesages:data[key].message,
      id:key
    }
    arr.push(obj)
    }
    return arr
  }
useEffect(()=>{
         // eslint-disable-next-line react-hooks/exhaustive-deps

  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
   const mesenger =  filter(data);
   console.log(mesenger);
       // eslint-disable-next-line react-hooks/exhaustive-deps

   setMessages(mesenger)
  });
},[])

  const addMessages =  () =>{
      set(ref(dbws, 'users/' + keyCol), {
      email: userEmail,
      message:message
    });
    setMessage('')
    }
    const keyCol = Date.now();
    const dbws = getDatabase();

    const openChat = () =>{
      return dispatch(setChat(true))
    }
    const closeChat =()=>{
      return dispatch(setChat(false))
    }
  return (
    <div>
      <SearchInput value={search} setSearch={setSearch} />
      <DropDawfFilter value={sortTocart} setSortTocart={setSortTocart} />
      <div className={cl.homeContainer}>
        {myAdmin === true && (
          <div className={cl.adminToolAdd}>
            <AddTocartHome
              inputUrl={newTocartUrl}
              inputPrice={newTocartPrice}
              inputName={newTocartName}
              setUrl={setUrl}
              setName={setName}
              setPrice={setPrice}
              adminToolAddTocart={adminToolAddTocart}
            />
          </div>
        )}
        {rezervTocart.map((el) => (
          <CardTocart
            className={cl.CardTocart}
            deleteTocartHome={deleteTocartHome}
            tocarPrice={el.price}
            tocartName={el.title}
            tocartImage={el.url}
            key={el.id}
            tocartId={el.id}
            addTocart={addTocart}
          />
        ))}
      </div>
      <div>
        {totalPageCount.map((el) => (
          <PaginatedButton key={el} page={el + 1} paginations={paginations}>
            {el + 1}
          </PaginatedButton>
        ))}
      </div>
      <div>
        {chat === true ? <Chat closeChat={closeChat} messages={messages} message={message} setMessage={setMessage} addMessages={addMessages}></Chat> : <OpenRealTimeChat openChat={openChat}></OpenRealTimeChat> }
       
      </div>
    </div>
  );
};
export default Home;
