import { useNavigate } from 'react-router-dom'
import { IBlog } from '~/types'

type Props = {
  blog: IBlog
}
export default function BlogItem(props: Props) {
  const { blog } = props
  const navigate = useNavigate()
  return (
    <div className='media mb-4' style={{ cursor: 'pointer' }} onClick={() => navigate(`/blog/${blog.id!}`)}>
      <img
        src={blog.image}
        className='mr-3 '
        alt='thumbnail'
        style={{ width: '80px', height: '80px' }}
        loading='lazy'
      />
      <div className='media-body'>
        <h5 className='mt-0 mb-1'>{blog.title}</h5>
        <span>{blog.description}</span>
      </div>
    </div>
  )
}
