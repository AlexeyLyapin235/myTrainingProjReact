import React from "react";
import Paragraph from "../paragraph/Paragraph";
import MyTitle from "../title/MyTitle";


const TotalCardBasket = ({totalPrice,totalCount,}) =>{
  return(
    <div>
        <MyTitle>Все товары</MyTitle>
        <Paragraph>Количество товаров:{totalCount}</Paragraph>
        <Paragraph>Итоговая цена:{totalPrice}</Paragraph>
    </div>
  )
}
export default TotalCardBasket