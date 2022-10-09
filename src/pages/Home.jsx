import React from "react";
import CardTocart from "../components/UI/CardTocart/CardTocart";
import { useSelector, useDispatch } from "react-redux";
import {
  addTocartBasket,
  addCount,
  adminAddTocart,
  removeTocart,
} from "../store/redaxToolkit/myStore";
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

  const tocart = useSelector((state) => state.myState.basketState);
  const myAdmin = useSelector((state) => state.myState.admin);
  const tocartHome = useSelector((state) => state.myState.tocart);
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
        .sort((a, b) => (a.price > b.price ? 1 : -1));
      setRezervTocart(sorted);
    }
    if (sortTocart === "Цена по уменьшению") {
      const sortedMin = rezervTocart
        .slice()
        .sort((a, b) => (a.price < b.price ? 1 : -1));
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
    deleteDoc(doc(db, "test", `${id}`));
    getTocarts();
  };
  const adminToolAddTocart = async () => {
    if (newTocartUrl && newTocartName && newTocartPrice !== "") {
      const keyCollection = Date.now();
      await setDoc(doc(db, "test", `${keyCollection}`), {
        url: newTocartUrl,
        title: newTocartName,
        price: newTocartPrice,
        id: Date.now(),
      });
      setUrl("");
      setName("");
      setPrice("");
      getTocarts();
    }
  };
  return (
    <div>
      <SearchInput value={search} setSearch={setSearch} />
      <DropDawfFilter value={sortTocart} setSortTocart={setSortTocart} />
      <div className={cl.homeContainer}>
        {myAdmin === true ? (
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
        ) : (
          ""
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
      <div></div>
      <div>
        {totalPageCount.map((el) => (
          <PaginatedButton key={el} page={el + 1} paginations={paginations}>
            {el + 1}
          </PaginatedButton>
        ))}
      </div>
    </div>
  );
};
export default Home;
