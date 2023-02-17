import { configureStore } from '@reduxjs/toolkit'
import auth from  './slices/userAuthSlice'

const store=configureStore({
  reducer: {
    auth
  }
})

export default store;