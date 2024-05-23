import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLazyGetBlogByIdQuery } from '~/redux/services/blogs.service'
import { IBlog } from '~/types'
import NotFoundPage from '../NotFound'
import './style.scss'

export default function ViewBlog() {
  const { id } = useParams<{ id: string }>()
  const [showNotFound, setShowNotFound] = useState(false)
  const [getBlog, getResponse] = useLazyGetBlogByIdQuery()
  const data: IBlog | undefined = getResponse.data
  useEffect(() => {
    if (id) {
      getBlog({ id })
    }
  }, [id])
  useEffect(() => {
    if (getResponse.isError || !id) setShowNotFound(true)
  }, [getResponse])
  if (showNotFound) return <NotFoundPage />
  return (
    <div style={{ position: 'relative' }}>
      {getResponse.isFetching && (
        <div className='overlay'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      )}
      <div className='row'>
        <Link to={`/blog/${id}/edit`}>
          <button
            className='btn btn-primary fixed-button'
            style={{ position: 'absolute', top: '0', right: '20px', zIndex: '999' }}
          >
            Update blog
          </button>
        </Link>
        <div className='col'>
          <h2>{data?.title}</h2>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <p>Created at: {data?.createdAt}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <p>{data?.content}</p>
        </div>
        <div className='col-md-6'>
          <img className='img-fluid' src={data?.image} alt='Blog' loading='lazy' />
        </div>
      </div>
    </div>
  )
}
