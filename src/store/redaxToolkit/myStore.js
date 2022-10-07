import { createSlice } from '@reduxjs/toolkit'
import { data } from '../../mosk/data'
const initialState = {
  value: false,
  basketState:[],
  admin:'',
  tocart:[...data]
} 

export const counterSlice = createSlice({
  name: 'myState',
  initialState,
  reducers: {
    setAdmin:(state,actions) =>{
     state.admin = actions.payload
    },
    logged : (state) => {
      state.value =true
    },
    exits: (state) => {
      state.value = false
    },
    addTocartBasket:(state,actions) =>{
      alert('Товар добавлен в корзину ')
      state.basketState.push(actions.payload)
    },
    deletTocartBasket:(state,actions) => {
    state.basketState.splice(actions.payload,1)
    },
    addCount:(state,actions) =>{
      alert('Товар добавлен в корзину ')
    state.basketState[actions.payload].count +=1
    },
    standartTocart:(state,actions) =>{
      state.tocart =actions.payload
    },
    adminAddTocart:(state,actions)=>{
      state.tocart.push(actions.payload)
    },
    adminDeleteTocart:(state,actions)=>{
     state.tocart = state.tocart.filter((el) => el.id !== actions.payload)
      console.log('я тут');
    }
  
  },
})

// Action creators are generated for each case reducer function
export const { logged , exits,addTocartBasket,deletTocartBasket,addCount,setAdmin,standartTocart,adminAddTocart,adminDeleteTocart } = counterSlice.actions

export default counterSlice.reducer