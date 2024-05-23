import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ToastMessage } from '~/types'

interface ToastState {
  toasts: ToastMessage[]
}

const initialState: ToastState = {
  toasts: []
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastMessage>) => {
      state.toasts.push(action.payload)
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
    }
  }
})

export const { showToast, removeToast } = toastSlice.actions
export default toastSlice.reducer
