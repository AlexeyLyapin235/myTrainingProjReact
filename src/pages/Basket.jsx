import React from "react";
import { useSelector,useDispatch } from 'react-redux';
import CardBasket from "../components/UI/CardTocart/CardBasket";
import {deletTocartBasket} from '../store/redaxToolkit/myStore'
import cl from './Basket.module.css'
import TotalCardBasket from "../components/UI/CardTocart/TotalCarbBasket";
import { useMemo } from "react";
import { useState } from "react";

const Basket = () =>{
    const tocartInBasket = useSelector((state) => state.myState.basketState);
    const dispatch = useDispatch()
    const [totalPrice,setTotalPrice] = useState(0);
    const [totalCount,setTotalCount] = useState(0);

    const deleteTocart = (id) => {
       const deletItemIndex = tocartInBasket.findIndex((el) => el.id === id)
       dispatch(deletTocartBasket(deletItemIndex))
    }
    useMemo(()=>{
       const sumPrice =  tocartInBasket.reduce((sum,el)=> sum + (el.price * el.count),0);
       const sumCount = tocartInBasket.reduce((sum,el)=> sum + el.count,0)
       setTotalPrice(sumPrice);
       setTotalCount(sumCount);
    },[tocartInBasket])
    return(
    <div >
       
        <TotalCardBasket totalPrice={totalPrice} totalCount={totalCount}></TotalCardBasket>
        <div className={cl.BasketPageContetn}>
        {tocartInBasket.map((el) => 
        <CardBasket 
        tocartName={el.name}
        tocartPrice={el.price}
        tocartImage={el.url} 
        count={el.count} 
        key={el.id}
        tocartId={el.id}
        deleteItem={deleteTocart}></CardBasket>
        )}
        </div>
    </div>
    )
}
export default Basket