import { configureStore } from '@reduxjs/toolkit'
import auth from  './slices/userAuthSlice'
import activate from './slices/activateSlice'

const store=configureStore({
  reducer: {
    auth,
    activate
  }
})

export default store;