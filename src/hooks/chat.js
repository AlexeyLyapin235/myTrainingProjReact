import { useDispatch } from "react-redux";


export const useChat = (callback) =>{
    const dispatch = useDispatch();
    const openChat = () => {
        return dispatch(callback(true));
      };
      const closeChat = () => {
        return dispatch(callback(false));
      };
      return {closeChat,openChat}
}