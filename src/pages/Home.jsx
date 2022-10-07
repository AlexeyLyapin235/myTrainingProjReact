import React from "react";
import CardTocart from "../components/UI/CardTocart/CardTocart";
import { useSelector, useDispatch } from 'react-redux';
import {addTocartBasket,addCount,adminAddTocart,adminDeleteTocart} from '../store/redaxToolkit/myStore'
import AddTocartHome from "../components/adminTools/AddTocartHome";
import cl from './Home.module.css'
import { useState } from "react";
import SearchInput from "../components/UI/input/SearchInput";
import { useEffect } from "react";
import DropDawfFilter from "../components/UI/dropdown/DropDown";
import PaginatedButton from "../components/UI/buttons/PaginatedButton";
import { useMemo } from "react";



const Home = () =>{
const tocart = useSelector((state) => state.myState.basketState);
const myAdmin = useSelector((state) => state.myState.admin);
const tocartHome = useSelector((state)=> state.myState.tocart);
const dispatch = useDispatch();
const [sortTocart,setSortTocart] = useState('');
const [search,setSearch] = useState('');
const [newTocartUrl,setUrl] = useState('');
const [newTocartName,setName] = useState('');
const [newTocartPrice,setPrice] = useState('');
const [rezervTocart,setRezervTocart] = useState([]);



const [ currentPage,setCurrentPage ] = useState(1);
const [tocarPerPage] = useState(5);
const totalPageCount =[]
useEffect(()=>{watchPaginated()},[tocartHome,currentPage]);

const watchPaginated =  async ()=>{
const lastIndex =  currentPage * tocarPerPage;
const firsIndex =  lastIndex - tocarPerPage;
const paginatedArr = await tocartHome.slice(firsIndex,lastIndex);
setRezervTocart(paginatedArr)
}
  
    
const paginations = (page) =>{setCurrentPage(page)}

useEffect(()=>{
if(search !== ''){
const filtered = tocartHome.filter((el)=> el.title.toLowerCase().includes(search.toLocaleLowerCase()))
setRezervTocart(filtered)}
else{
setRezervTocart(tocartHome)
}},[search])

useMemo(()=>{
const count = tocartHome.length;
const total = Math.ceil(count / 5);
for(let i = 0 ; i < total;i++){
totalPageCount.push(i)
}},[rezervTocart])

useEffect(()=>{
if(sortTocart === 'Цена по увелечению'){
setRezervTocart(rezervTocart.slice().sort((a,b)=>(a.price > b.price ? 1:-1)))
}
if(sortTocart === 'Цена по уменьшению'){
 setRezervTocart(rezervTocart.slice().sort((a,b)=>(a.price < b.price ? 1:-1)))
}
},[sortTocart])

const addTocart = (price,name,url,id) =>{
const basket = {
     price,
     name,
     url,
     count:1,
     id,
}
let findElem = tocart.findIndex((el) => el.id === basket.id);
findElem === -1 ? dispatch(addTocartBasket(basket)) : dispatch(addCount(findElem)); 
}
  
const deleteTocartHome = async(id)=>{
    dispatch( adminDeleteTocart(id));
    setRezervTocart(tocartHome);
};
const adminToolAddTocart =()=>{
 if(newTocartUrl && newTocartName && newTocartPrice !=='' ){
    const newTocart = {
    url:newTocartUrl,
    title:newTocartName,
    price:newTocartPrice,
    id:Date.now()
    };
    dispatch(adminAddTocart(newTocart));
    setRezervTocart(tocartHome);
    setUrl('');
    setName('');
    setPrice('');
 }};
    return(
    <div>
        <SearchInput value={search} setSearch={setSearch} />
        <DropDawfFilter value={sortTocart} setSortTocart={setSortTocart}/>
    <div className={cl.homeContainer}>
        {myAdmin === 'admin' ? 
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
        </div> : ''}
        {rezervTocart.map((el)=>
        <CardTocart className={cl.CardTocart} deleteTocartHome={deleteTocartHome} tocarPrice={el.price} tocartName={el.title} tocartImage={el.url} key={el.id} tocartId={el.id} addTocart={addTocart}/>
        )}
    </div>
    <div>
    </div>
     <div>
        {totalPageCount.map((el)=>
        <PaginatedButton key={el} page={el+1} paginations={paginations} >{el+1}</PaginatedButton>
        )}
        </div> 
    </div> 
    )
        }
export default Home