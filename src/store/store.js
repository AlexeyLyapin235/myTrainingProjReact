import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reduxToolkit/myStore'

export const store = configureStore({
  reducer: {
    myState:counterReducer
  },
})