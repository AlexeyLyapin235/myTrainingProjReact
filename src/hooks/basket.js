import { useSelector } from "react-redux";
import { useState  }  from "react";


export const useBasket = () =>{
  const tocartInBasket = useSelector((state) => state.myState.basketState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const totalBasket = () =>{
    const sumPrice = tocartInBasket.reduce(
      (sum, el) => sum + el.price * el.count,
      0
    );
    const sumCount = tocartInBasket.reduce((sum, el) => sum + el.count, 0);
    setTotalPrice(sumPrice);
 
    setTotalCount(sumCount);
}
return [totalPrice,totalCount,tocartInBasket,totalBasket]
}