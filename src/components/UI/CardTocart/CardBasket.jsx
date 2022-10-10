import React from "react";
import ButtonTocart from "../buttons/ButtonTocart";
import cl from './CardBasket.module.css'

const CardBasket = ({tocartName,tocartPrice,count,tocartImage,deleteItem,tocartId}) =>{

    return(
  <div className={cl.containerBasket}>
    <img src={tocartImage} className={cl.CardBasketImage} alt="Картинка не загрузилась"/>
    <div className={cl.buttons}>
    <ButtonTocart className={cl.quikviewbutton} title="удалить с корзины" onClick={()=>deleteItem(tocartId)}>Удалить из корзины</ButtonTocart>
    </div>
    <div className={cl.productlist}>
      <h3>{tocartName}</h3>
      <div className={cl.price}>&#8381; {tocartPrice}</div>
      <div className={cl.tocartCount}>Количество:{count}</div>
    </div>
  </div>
    )
}
export default CardBasket