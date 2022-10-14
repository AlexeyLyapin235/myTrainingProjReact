import React from "react";
import ButtonTocart from "../buttons/ButtonTocart";
import cl from "./CardTocart.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import DeleteButton from "../buttons/DeleteButton";
import TextArea from "../input/TextArea";
import Comments from "../../Comments";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../..";
import { useEffect } from "react";

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
  }, []);

  const focusAdmin = () => {
    if (myAdmin) {
      setAdminToolsDelete(true);
    }
  };
  const focusAdminLeave = () => {
    if (myAdmin) {
      setAdminToolsDelete(false);
    }
  };
  const [comment, setComment] = useState("");

  const addComments = async (id) => {
    if (userEmail && comment) {
      const objComent = {
        user: userEmail,
        comment: comment,
        commentId: Date.now(),
      };
      const washingtonRef = doc(db, "test", `${id}`);
      await updateDoc(washingtonRef, {
        comment: arrayUnion(objComent),
      }).then(() => {
        setComment("");
        setRezervComment([...rezervComment, objComent]);
      });
    }
  };

  return (
    <div
      className={cl.CardTocart}
      onMouseOver={focusAdmin}
      onMouseOut={focusAdminLeave}
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
        {rezervComment ? (
          <h2>Коментариев ({rezervComment.length})</h2>
        ) : (
          <h2>Коментарии(0)</h2>
        )}
        {rezervComment?.map((el) => (
          <div key={el.commentId}>
            <Comments messages={el.comment} email={el.user}></Comments>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CardTocart;
