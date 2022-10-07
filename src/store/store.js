import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './redaxToolkit/myStore'

export const store = configureStore({
  reducer: {
    myState:counterReducer
  },
})