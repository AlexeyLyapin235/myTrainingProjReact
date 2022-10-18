import React from "react";
import {  useDispatch } from "react-redux";
import CardBasket from "../components/UI/CardTocart/CardBasket";
import { deletTocartBasket } from "../store/reduxToolkit/myStore";
import cl from "./Basket.module.css";
import TotalCardBasket from "../components/UI/CardTocart/TotalCarbBasket";
import { useMemo } from "react";
import { useBasket } from "../hooks/basket";

const Basket = () => {
 
     const dispatch = useDispatch();
  const deleteTocart = (id) => {
    const deletItemIndex = tocartInBasket.findIndex((el) => el.id === id);
    dispatch(deletTocartBasket(deletItemIndex));
  };
  const [totalPrice,totalCount,tocartInBasket,totalBasket] = useBasket()
  useMemo(() => {
    totalBasket()
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tocartInBasket]);
  return (
    <div>
      <TotalCardBasket
        totalPrice={totalPrice}
        totalCount={totalCount}
      ></TotalCardBasket>
      <div className={cl.BasketPageContetn}>
        {tocartInBasket.map((el) => (
          <CardBasket
            tocartName={el.name}
            tocartPrice={el.price}
            tocartImage={el.url}
            count={el.count}
            key={el.id}
            tocartId={el.id}
            deleteItem={deleteTocart}
          ></CardBasket>
        ))}
      </div>
    </div>
  );
};
export default Basket;
