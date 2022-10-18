import React,{ useState,useEffect,useMemo  }  from "react";
import CardTocart from "../components/UI/CardTocart/CardTocart";
import { useSelector, useDispatch } from "react-redux";
import {
  addTocartBasket,
  addCount,
  adminAddTocart,
  removeTocart,
  setChat,
} from "../store/reduxToolkit/myStore";
import { getDatabase, ref, set, onValue } from "firebase/database";
import AddTocartHome from "../components/adminTools/AddTocartHome";
import cl from "./Home.module.css";
import SearchInput from "../components/UI/input/SearchInput";
import DropDawfFilter from "../components/UI/dropdown/DropDown";
import PaginatedButton from "../components/UI/buttons/PaginatedButton";
import Chat from "../components/UI/chat/Chat";
import OpenRealTimeChat from "../components/UI/chat/OpenRealTimeChat";
import { filterData, filtersPrice, paginatedFilter, seacrhed } from "../utils/filters";
import { usePaginate } from "../hooks/paginated";
import { useGetTocarts, useTocartTools } from "../hooks/tocartsTools";
import { useChat } from "../hooks/chat";
const Home = () => {
  const dispatch = useDispatch();
 
  const {getTocarts,deleteTocartHome} = useGetTocarts(removeTocart,adminAddTocart)
  useEffect(() => {
    dispatch(removeTocart([]));
    getTocarts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const chat = useSelector((state) => state.myState.chat);
  const tocart = useSelector((state) => state.myState.basketState);
  const myAdmin = useSelector((state) => state.myState.admin);
  const tocartHome = useSelector((state) => state.myState.tocart);
  const userEmail = useSelector((state) => state.myState.email);

  const [sortTocart, setSortTocart] = useState("");
  const [search, setSearch] = useState("");
  const [newTocartUrl, setUrl] = useState("");
  const [newTocartName, setName] = useState("");
  const [newTocartPrice, setPrice] = useState("");
  const [rezervTocart, setRezervTocart] = useState([]);
  

  const {watchPaginated,paginations,totalPageCount,currentPage} = usePaginate(tocartHome,setRezervTocart);
  useEffect(() => {
    watchPaginated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tocartHome, currentPage,chat]);

  useEffect(() => {
    seacrhed(search,tocartHome,setRezervTocart,watchPaginated)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useMemo(() => {
    paginatedFilter(tocartHome,totalPageCount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rezervTocart]);
 
  const sortMax = "Цена по увелечению";
  const sortMin = "Цена по уменьшению";
  useEffect(() => {
  filtersPrice(rezervTocart,setRezervTocart,sortTocart,sortMax,sortMin)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortTocart]);

  
  const [addTocart,adminToolAddTocart]  = useTocartTools(getTocarts,setUrl,setName,setPrice,tocart,addTocartBasket,addCount)
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const dbs = getDatabase();
  const starCountRef = ref(dbs, "users/");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const mesenger = filterData(data);
      setMessages(mesenger);
    });
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMessages = () => {
    const keyCol = Date.now();
    const dbws = getDatabase();
    set(ref(dbws, "users/" + keyCol), {
      email: userEmail,
      message: message,
    });
    setMessage("");
  };
  
  const {openChat,closeChat} = useChat(setChat)
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
              adminToolAddTocart={()=>adminToolAddTocart(newTocartUrl,newTocartName,newTocartPrice )}
            />
          </div>
        )}
        {rezervTocart.map((el) => (
          <CardTocart
            userEmail={userEmail}
            className={cl.CardTocart}
            deleteTocartHome={deleteTocartHome}
            tocarPrice={el.price}
            tocartName={el.title}
            tocartImage={el.url}
            key={el.id}
            tocartId={el.id}
            addTocart={addTocart}
            el={el}
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
        {chat === true ? (
          <Chat
            closeChat={closeChat}
            messages={messages}
            message={message}
            setMessage={setMessage}
            addMessages={()=> addMessages(userEmail,message,setMessage)}
          ></Chat>
        ) : (
          <OpenRealTimeChat openChat={openChat}></OpenRealTimeChat>
        )}
      </div>
    </div>
  );
};
export default Home;
