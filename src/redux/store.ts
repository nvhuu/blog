import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './features/toastSlice'
import { blogApi } from './services/blogs.service'

const store = configureStore({
  reducer: {
    toast: toastReducer,
    [blogApi.reducerPath]: blogApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([blogApi.middleware])
})

export default store
