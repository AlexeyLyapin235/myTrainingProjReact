import React from "react";
import ButtonTocart from "../buttons/ButtonTocart";
import cl from "./CardTocart.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import DeleteButton from "../buttons/DeleteButton";
import TextArea from "../input/TextArea";
import Comments from "../../Comments";
import { useEffect } from "react";
import { addComent } from "../../../api/firestore";
import { useFocus } from "../../../hooks/focus";

const CardTocart = ({
  userEmail,
  tocartName,
  tocarPrice,
  tocartImage,
  addTocart,
  tocartId,
  deleteTocartHome,
  el,
}) => {
  const myAdmin = useSelector((state) => state.myState.admin);
  const [adminToolsDelete, setAdminToolsDelete] = useState("");
  const [rezervComment, setRezervComment] = useState([]);
  useEffect(() => {
    setRezervComment(el.comment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const [focus,focusLeave] = useFocus(myAdmin,setAdminToolsDelete)
  const [comment, setComment] = useState("");
  const [viewComments,setViewComments] = useState(false);

  const addComments = async (id) => {
    if (userEmail && comment) {
      const objComent = {
        user: userEmail,
        comment: comment,
        commentId: Date.now(),
      };
      addComent(objComent,id).then(() => {
        setComment("");
        setRezervComment([...rezervComment, objComent]);
      });
     
    }
  };

  return (
    <div
      className={cl.CardTocart}
      onMouseOver={focus}
      onMouseOut={focusLeave}
    >
      {adminToolsDelete && (
        <DeleteButton onClick={() => deleteTocartHome(tocartId)}></DeleteButton>
      )}
      <div className={cl.productItem}>
        <div>
          <img
            className={cl.tocartImage}
            src={tocartImage}
            alt="Картинка не загрузилась"
          />
        </div>
        <div className="product-list">
          <h3>{tocartName}</h3>
          <p className="price">₽{tocarPrice}</p>
          <ButtonTocart
            onClick={() =>
              addTocart(tocarPrice, tocartName, tocartImage, tocartId)
            }
          >
            В корзину
          </ButtonTocart>
          <TextArea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></TextArea>
          <ButtonTocart onClick={() => addComments(tocartId)}>
            Отправить коментарий
          </ButtonTocart>
        </div>
      </div>
      <div className={cl.commentBlock}>
        <button onClick={() => setViewComments(!viewComments)}>{viewComments?'Cкрыть коментарии':'Показать коментарии'}</button>

        {rezervComment ? (
          <h2>Коментариев ({rezervComment.length})</h2>
        ) : (
          <h2>Коментарии(0)</h2>
        )}
        {viewComments && rezervComment?.map((el) => (
          <div key={el.commentId}>
            <Comments commentId={el.commentId} messages={el.comment} email={el.user}></Comments>
          </div>
        )) }
      </div>
    </div>
  );
};
export default CardTocart;
