import React from 'react'
import Toast from 'react-bootstrap/Toast'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS } from '~/constants/enum'
import { removeToast } from '~/redux/features/toastSlice'
import { ToastMessage } from '~/types'

const ToastComponent: React.FC = () => {
  const toasts: ToastMessage[] = useSelector((state: any) => state.toast.toasts)
  const dispatch = useDispatch()

  const handleToastClose = (id: string) => {
    dispatch(removeToast(id))
  }
  const getStatusIcon = (status: STATUS = STATUS.INFO) => {
    switch (status) {
      case 'success':
        return <i className='bi bi-check-circle-fill text-success mr-2'></i>
      case 'error':
        return <i className='bi bi-x-circle-fill text-danger mr-2'></i>
      case 'warning':
        return <i className='bi bi-exclamation-circle-fill text-warning mr-2'></i>
      case 'info':
        return <i className='bi bi-info-circle-fill text-info mr-2'></i>
      default:
        return null
    }
  }
  return (
    <div className='toast-container top-0 end-0 p-3'>
      {toasts.map((toast: ToastMessage) => (
        <Toast key={toast.id} onClose={() => handleToastClose(toast.id)} show={true} delay={3000} autohide>
          <Toast.Header closeButton={false}>
            {getStatusIcon(toast?.status)} <strong className='mr-auto'>{toast?.header || toast.status}</strong>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      ))}
    </div>
  )
}

export default ToastComponent
