import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiUrl } from '~/constants/enum'
import { IBlog, IQueryBlogs } from '~/types'
import ApiUtil from '~/utils/api.util'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({ baseUrl: ApiUtil.getApiRoot() }),
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({
    getBlogs: builder.query<IBlog[], IQueryBlogs>({
      query: (query: any) => {
        return {
          url: ApiUtil.getApiUrl(ApiUrl.BLOGS, null, query),
          method: 'GET'
        }
      },
      providesTags: ['Blogs'],
      transformResponse: (response: IBlog[]) => response,
      transformErrorResponse: (response: { status: string | number }) => response.status
    }),
    getBlogById: builder.query<IBlog, any>({
      query: (params: any) => {
        return {
          url: ApiUtil.getApiUrl(ApiUrl.BLOG_ID, { id: params.id }),
          method: 'GET'
        }
      },
      providesTags: ['Blogs'],
      transformResponse: (response: IBlog) => response,
      transformErrorResponse: (response: { status: string | number }) => response.status
    }),
    createBlog: builder.mutation<any, IBlog>({
      query: (body: IBlog) => {
        return {
          url: ApiUtil.getApiUrl(ApiUrl.BLOGS),
          method: 'POST',
          body
        }
      },
      transformResponse: (response: IBlog) => response,
      transformErrorResponse: (response: { status: string | number }) => response.status
    }),
    updateBlog: builder.mutation<any, IBlog>({
      query: (body: IBlog) => {
        return {
          url: ApiUtil.getApiUrl(ApiUrl.BLOG_ID, { id: body.id! }),
          method: 'PUT',
          body
        }
      },
      transformResponse: (response: { data: IBlog }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status
    }),
    deleteBlog: builder.mutation<IBlog, any>({
      query: (params: any) => {
        return {
          url: ApiUtil.getApiUrl(ApiUrl.BLOG_ID, { id: params.id }),
          method: 'DELETE'
        }
      },
      transformResponse: (response: { data: IBlog }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status
    })
  })
})

export const {
  useLazyGetBlogsQuery,
  useLazyGetBlogByIdQuery,
  useUpdateBlogMutation,
  useCreateBlogMutation,
  useDeleteBlogMutation
} = blogApi
