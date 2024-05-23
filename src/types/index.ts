import { STATUS } from '~/constants/enum'

export interface IBlog {
  id?: string
  title: string
  image?: string | undefined
  content: string
  description?: string
  createdAt?: string
}
export interface IQueryBlogs {
  page: number
  limit: number
  sortBy: string
  order: string
  search: string
}
export interface ToastMessage {
  id: string
  header?: string
  message: string
  status: STATUS
}
export interface ErrorResponse {
  status: any
  data: any
}
