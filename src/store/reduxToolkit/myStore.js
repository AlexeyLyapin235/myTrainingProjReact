import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuth: false,
  basketState: [],
  admin: false,
  tocart: [],
  email:"",
  creationTime:"",
  lastSignInTime:"",
  chat:false,

};

export const counterSlice = createSlice({
  name: "myState",
  initialState,
  reducers: {
    setChat:(state,actions) =>{
      state.chat = actions.payload
    },
    setEmailStore:(state,actions) =>{
      state.email = actions.payload
    },
    setCreationTime:(state,actions) =>{
      state.creationTime = actions.payload
    },
    setLastSignInTime:(state,actions) =>{
      state.lastSignInTime = actions.payload
    },
    setAdmin: (state) => {
      state.admin = true;
    },
    logged: (state) => {
      state.isAuth = true;
    },
    exits: (state) => {
      state.isAuth = false;
    },
    addTocartBasket: (state, actions) => {
      alert("Товар добавлен в корзину ");
      state.basketState.push(actions.payload);
    },
    deletTocartBasket: (state, actions) => {
      state.basketState.splice(actions.payload, 1);
    },
    addCount: (state, actions) => {
      alert("Товар добавлен в корзину ");
      state.basketState[actions.payload].count += 1;
    },
    standartTocart: (state, actions) => {
      state.tocart = actions.payload;
    },
    adminAddTocart: (state, actions) => {
      state.tocart.push(actions.payload);
    },
    removeTocart: (state, actions) => {
      state.tocart = actions.payload;
    },
    adminDeleteTocart: (state, actions) => {
      state.tocart = state.tocart.filter((el) => el.id !== actions.payload);
    },
  },
});

export const {
  logged,
  exits,
  addTocartBasket,
  deletTocartBasket,
  addCount,
  setAdmin,
  standartTocart,
  adminAddTocart,
  adminDeleteTocart,
  removeTocart,
  setEmailStore,
  setCreationTime,
  setLastSignInTime,
  setChat
} = counterSlice.actions;

export default counterSlice.reducer;
