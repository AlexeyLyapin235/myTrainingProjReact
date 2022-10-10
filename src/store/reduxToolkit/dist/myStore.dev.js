"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setLastSignInTime = exports.setCreationTime = exports.setEmailStore = exports.removeTocart = exports.adminDeleteTocart = exports.adminAddTocart = exports.standartTocart = exports.setAdmin = exports.addCount = exports.deletTocartBasket = exports.addTocartBasket = exports.exits = exports.logged = exports.counterSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  isAuth: false,
  basketState: [],
  admin: false,
  tocart: [],
  email: "",
  creationTime: "",
  lastSignInTime: ""
};
var counterSlice = (0, _toolkit.createSlice)({
  name: "myState",
  initialState: initialState,
  reducers: {
    setEmailStore: function setEmailStore(state, actions) {
      state.email = actions.payload;
    },
    setCreationTime: function setCreationTime(state, actions) {
      state.creationTime = actions.payload;
    },
    setLastSignInTime: function setLastSignInTime(state, actions) {
      state.lastSignInTime = actions.payload;
    },
    setAdmin: function setAdmin(state) {
      state.admin = true;
    },
    logged: function logged(state) {
      state.isAuth = true;
    },
    exits: function exits(state) {
      state.isAuth = false;
    },
    addTocartBasket: function addTocartBasket(state, actions) {
      alert("Товар добавлен в корзину ");
      state.basketState.push(actions.payload);
    },
    deletTocartBasket: function deletTocartBasket(state, actions) {
      state.basketState.splice(actions.payload, 1);
    },
    addCount: function addCount(state, actions) {
      alert("Товар добавлен в корзину ");
      state.basketState[actions.payload].count += 1;
    },
    standartTocart: function standartTocart(state, actions) {
      state.tocart = actions.payload;
    },
    adminAddTocart: function adminAddTocart(state, actions) {
      state.tocart.push(actions.payload);
    },
    removeTocart: function removeTocart(state, actions) {
      state.tocart = actions.payload;
    },
    adminDeleteTocart: function adminDeleteTocart(state, actions) {
      state.tocart = state.tocart.filter(function (el) {
        return el.id !== actions.payload;
      });
    }
  }
});
exports.counterSlice = counterSlice;
var _counterSlice$actions = counterSlice.actions,
    logged = _counterSlice$actions.logged,
    exits = _counterSlice$actions.exits,
    addTocartBasket = _counterSlice$actions.addTocartBasket,
    deletTocartBasket = _counterSlice$actions.deletTocartBasket,
    addCount = _counterSlice$actions.addCount,
    setAdmin = _counterSlice$actions.setAdmin,
    standartTocart = _counterSlice$actions.standartTocart,
    adminAddTocart = _counterSlice$actions.adminAddTocart,
    adminDeleteTocart = _counterSlice$actions.adminDeleteTocart,
    removeTocart = _counterSlice$actions.removeTocart,
    setEmailStore = _counterSlice$actions.setEmailStore,
    setCreationTime = _counterSlice$actions.setCreationTime,
    setLastSignInTime = _counterSlice$actions.setLastSignInTime;
exports.setLastSignInTime = setLastSignInTime;
exports.setCreationTime = setCreationTime;
exports.setEmailStore = setEmailStore;
exports.removeTocart = removeTocart;
exports.adminDeleteTocart = adminDeleteTocart;
exports.adminAddTocart = adminAddTocart;
exports.standartTocart = standartTocart;
exports.setAdmin = setAdmin;
exports.addCount = addCount;
exports.deletTocartBasket = deletTocartBasket;
exports.addTocartBasket = addTocartBasket;
exports.exits = exits;
exports.logged = logged;
var _default = counterSlice.reducer;
exports["default"] = _default;
//# sourceMappingURL=myStore.dev.js.map
