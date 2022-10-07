import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ButtonTocart from "../UI/buttons/ButtonTocart";
import InputAdd from "../UI/input/InputAdd";


const AddTocartHome = ({inputUrl,inputName,inputPrice,setUrl,setPrice,setName,adminToolAddTocart}) =>{
  const [greenFocusName,setGreenFocus] = useState(false);
  const [greenFocusUrl,setGreenFocusUrl] = useState(false);
  const [greenFocusPrice,setGreenFocusPrice] = useState(false);
  
    useEffect(()=>{
      inputName.length > 0 ? setGreenFocus(true):setGreenFocus(false)
    },[inputName])
    useEffect(()=>{
        inputUrl.length > 0 ? setGreenFocusUrl(true):setGreenFocusUrl(false)
      },[inputUrl])
    useEffect(()=>{
        inputPrice.length > 0 ? setGreenFocusPrice(true):setGreenFocusPrice(false)
      },[inputPrice])

    return(
    <div>
        <InputAdd value={inputUrl}  greenfocus={greenFocusUrl} onChange={event => setUrl(event.target.value)} placeholder="введите url товара"></InputAdd>
        <InputAdd value={inputName} greenfocus={greenFocusName} onChange={event => setName(event.target.value)} placeholder="введите название товара"></InputAdd>
        <InputAdd value={inputPrice}  greenfocus={greenFocusPrice} onChange={event => setPrice(event.target.value)} placeholder="введите цену товара "></InputAdd>
        <ButtonTocart onClick={adminToolAddTocart}>Создать товар</ButtonTocart>
    </div>
    )
}
export default AddTocartHome