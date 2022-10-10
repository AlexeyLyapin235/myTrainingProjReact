import React from "react";
import ButtonTocart from "../UI/buttons/ButtonTocart";
import InputAdd from "../UI/input/InputAdd";

const AddTocartHome = ({
  inputUrl,
  inputName,
  inputPrice,
  setUrl,
  setPrice,
  setName,
  adminToolAddTocart,
}) => {
  return (
    <div>
      <InputAdd
        value={inputUrl}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="введите url товара"
      ></InputAdd>
      <InputAdd
        value={inputName}
        onChange={(event) => setName(event.target.value)}
        placeholder="введите название товара"
      ></InputAdd>
      <InputAdd
        value={inputPrice}
        onChange={(event) => setPrice(event.target.value)}
        placeholder="введите цену товара "
      ></InputAdd>
      <ButtonTocart onClick={adminToolAddTocart}>Создать товар</ButtonTocart>
    </div>
  );
};
export default AddTocartHome;
