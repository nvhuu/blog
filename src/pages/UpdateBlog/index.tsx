import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { STATUS } from '~/constants/enum'
import { showToast } from '~/redux/features/toastSlice'
import {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useLazyGetBlogByIdQuery,
  useUpdateBlogMutation
} from '~/redux/services/blogs.service'
import { IBlog } from '~/types'
import NotFoundPage from '../NotFound'
import './style.scss'
const UpdateBlog: React.FC = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<string | undefined>(undefined)
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    content: ''
  })
  const [showNotFound, setShowNotFound] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [createBlog, createResponse] = useCreateBlogMutation()
  const [updateBlog, updateResponse] = useUpdateBlogMutation()
  const [deleteBlog, deleteResponse] = useDeleteBlogMutation()
  const [getBlog, getResponse] = useLazyGetBlogByIdQuery()
  const isLoading =
    createResponse.isLoading || getResponse.isFetching || updateResponse.isLoading || deleteResponse.isLoading
  const { id } = useParams<{ id: string }>()
  const pageTitle = id ? 'Update blog' : 'Create new blog'
  useEffect(() => {
    if (id) {
      getBlog({ id })
    }
  }, [id])
  useEffect(() => {
    if (createResponse.isError || updateResponse.isError || deleteResponse.isError) {
      dispatch(
        showToast({
          id: Date.now().toString(),
          status: STATUS.ERROR,
          message: 'Something went wrong!'
        })
      )
    }
    if (getResponse.isError && id) setShowNotFound(true)
    if (getResponse.isSuccess) {
      const data = getResponse.data
      setTitle(data.title)
      setDescription(data?.description || '')
      setContent(data.content)
      setImage(data?.image || '')
    }
    if (createResponse.isSuccess) {
      dispatch(
        showToast({
          id: Date.now().toString(),
          status: STATUS.SUCCESS,
          message: 'Blog created'
        })
      )
      const id = createResponse.data.id!
      navigate(`/blog/${id}`)
    }
    if (updateResponse.isSuccess) {
      dispatch(
        showToast({
          id: Date.now().toString(),
          status: STATUS.SUCCESS,
          message: 'Blog updated'
        })
      )
      navigate(`/blog/${id}`)
    }
    if (deleteResponse.isSuccess) {
      dispatch(
        showToast({
          id: Date.now().toString(),
          status: STATUS.SUCCESS,
          message: 'Blog deleted'
        })
      )
      navigate(`/`)
    }
  }, [getResponse, createResponse, updateResponse, deleteResponse])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    let formValid = true
    const newErrors = {
      title: '',
      description: '',
      content: ''
    }

    if (title.trim() === '') {
      formValid = false
      newErrors.title = 'Title is required'
    }

    if (description.trim() === '') {
      formValid = false
      newErrors.description = 'Description is required'
    }

    if (content.trim() === '') {
      formValid = false
      newErrors.content = 'Content is required'
    }
    if (image && image.trim() === '') {
      setImage(undefined)
    }

    if (formValid) {
      const newBlog: IBlog = {
        title,
        content,
        description,
        image
      }
      if (id) {
        newBlog.id = id
        updateBlog(newBlog)
      } else createBlog(newBlog)
      setTitle('')
      setDescription('')
      setContent('')
      setImage('')
      setErrors({
        title: '',
        description: '',
        content: ''
      })
    } else {
      setErrors(newErrors)
    }
  }
  const handleCancel = () => {
    navigate(-1)
  }
  if (showNotFound) return <NotFoundPage />
  return (
    <form onSubmit={handleSubmit}>
      <div className='d-flex justify-content-center'>
        <h3>{pageTitle}</h3>
      </div>
      {isLoading && (
        <div className='overlay'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      )}
      <div className='form-group'>
        <label htmlFor='title'>
          <span className='text-danger'> *</span>Title:
        </label>
        <input
          type='text'
          id='title'
          className='form-control'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
        {errors.title && <div className='text-danger'>{errors.title}</div>}
      </div>

      <div className='form-group'>
        <label htmlFor='description'>
          <span className='text-danger'> *</span>Description:
        </label>
        <input
          type='text'
          id='description'
          className='form-control'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
        {errors.description && <div className='text-danger'>{errors.description}</div>}
      </div>

      <div className='form-group'>
        <label htmlFor='content'>
          <span className='text-danger'> *</span>Content:
        </label>
        <textarea
          id='content'
          className='form-control'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          disabled={isLoading}
        />
        {errors.content && <div className='text-danger'>{errors.content}</div>}
      </div>

      <div className='form-group'>
        <label htmlFor='image'>Image URL</label>
        <input
          type='text'
          id='image'
          className='form-control'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          disabled={isLoading}
        />
        <div className='text-warning'>If image url is empty, random image will be used</div>
      </div>
      <div className='d-flex justify-content-center'>
        <button type='submit' className='btn btn-primary mr-2' disabled={isLoading}>
          Save
        </button>
        {id && (
          <button
            type='button'
            className='btn btn-secondary mr-2'
            onClick={() => deleteBlog({ id })}
            disabled={isLoading}
          >
            Remove
          </button>
        )}
        <button type='button' className='btn btn-secondary' onClick={handleCancel} disabled={isLoading}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default UpdateBlog
