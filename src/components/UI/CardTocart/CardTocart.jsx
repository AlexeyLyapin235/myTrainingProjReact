import React from "react";
import ButtonTocart from "../buttons/ButtonTocart";
import cl from './CardTocart.module.css'
import { useSelector,  } from 'react-redux';
import { useState } from "react";
import DeleteButton from "../buttons/DeleteButton";



const CardTocart = ({tocartName,tocarPrice,tocartImage,addTocart,tocartId,deleteTocartHome}) =>{
  const myAdmin = useSelector((state) => state.myState.admin);

  const [adminToolsDelete,setAdminToolsDelete] = useState('')
  const focusAdmin = ()=>{
      if(myAdmin){
          setAdminToolsDelete(true);
      }
  }
  const focusAdminLeave =()=>{
      if(myAdmin){
          setAdminToolsDelete(false);    
      }
  }
  
  
  return(
  <div className={cl.CardTocart} onMouseOver={focusAdmin} onMouseOut={focusAdminLeave}>
    {adminToolsDelete ? <DeleteButton onClick={() => deleteTocartHome(tocartId)}></DeleteButton> : ''}
    <div className={cl.productItem}>
      <div>
    
    <img className={cl.tocartImage} src={tocartImage}/>
      </div>
    <div className="product-list">
    <h3>{tocartName}</h3>
      <p className="price">₽{tocarPrice}</p>
     <ButtonTocart onClick={() => addTocart(tocarPrice,tocartName,tocartImage,tocartId)}>В корзину</ButtonTocart>
  </div>
</div>
  </div>
    )
}
export default CardTocart;