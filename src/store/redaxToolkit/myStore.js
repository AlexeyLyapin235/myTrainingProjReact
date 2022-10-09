import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuth: false,
  basketState: [],
  admin: false,
  tocart: [],
  firebase: "",
  auth: "",
  fireStore: "",
};

export const counterSlice = createSlice({
  name: "myState",
  initialState,
  reducers: {
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
} = counterSlice.actions;

export default counterSlice.reducer;
