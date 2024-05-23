import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogItem from '~/components/BlogItem'
import Pagination from '~/components/Pagination'
import Search from '~/components/Search'
import { HTTP_CODE, STATUS } from '~/constants/enum'
import { showToast } from '~/redux/features/toastSlice'
import { useLazyGetBlogsQuery } from '~/redux/services/blogs.service'
import { IBlog, IQueryBlogs } from '~/types'

export default function HomePage() {
  const limit = 5
  const [query, setQuery] = useState<IQueryBlogs>({ page: 1, limit, sortBy: 'id', order: 'asc', search: '' })
  const [getBlogs, queryResponse] = useLazyGetBlogsQuery()
  const dispatch = useDispatch()
  const [pageList, setPageList] = useState([1])
  const [isHasNextPage, setIsHasNextPage] = useState(false)
  useEffect(() => {
    getBlogs(query)
  }, [query])

  useEffect(() => {
    if (queryResponse.isError) {
      setPageList([1])
      setIsHasNextPage(false)
      if ((queryResponse.error as number) != HTTP_CODE.NOT_FOUND)
        dispatch(
          showToast({
            id: Date.now().toString(),
            status: STATUS.ERROR,
            message: 'Something went wrong!'
          })
        )
    } else {
      if (!queryResponse.isFetching) {
        const isHaveNextPage = queryResponse.data?.length === limit
        if (isHaveNextPage) {
          if (query.page === pageList[pageList.length - 1]) {
            setPageList((prev) => {
              const temp = [...prev]
              if (query.page !== 1) temp.shift()
              temp.push(query.page + 1)
              return temp
            })
          }
          if (query.page !== 1 && query.page == pageList[0]) {
            setPageList((prev) => {
              const temp = [...prev]
              temp.unshift(query.page - 1)
              temp.pop()
              return temp
            })
          }
        }
        setIsHasNextPage(isHaveNextPage)
      }
    }
  }, [queryResponse])
  const handleChangeQuery = (obj: object) => {
    setQuery((prevQuery) => ({ ...prevQuery, ...obj }))
  }
  const handleSearch = (value: string) => {
    setPageList([1])
    handleChangeQuery({ page: 1, search: value })
  }
  return (
    <div style={{ position: 'relative' }}>
      <Link to={'/create'}>
        <button
          className='btn btn-primary fixed-button'
          style={{ position: 'absolute', top: '0', right: '20px', zIndex: '999' }}
        >
          Create blog
        </button>
      </Link>
      <div className='d-flex justify-content-center mb-3'>
        <Search search={query.search} callBack={handleSearch} />
      </div>
      {queryResponse.isFetching ? (
        <div className='progress mb-2' style={{ height: '5px' }}>
          <div
            className='progress-bar progress-bar-striped progress-bar-animated'
            role='progressbar'
            aria-valuenow='100'
            aria-valuemin='0'
            aria-valuemax='100'
            style={{ width: '100%' }}
          />
        </div>
      ) : !queryResponse.isError && queryResponse.data?.length ? (
        <div className='list-unstyled'>
          {queryResponse.data?.map((blog: IBlog) => <BlogItem blog={blog} key={'blog-' + blog.id} />)}
        </div>
      ) : (
        <div className='mb-3'>No Data</div>
      )}
      <Pagination
        currentPage={query.page}
        onChangePage={(value: number) => handleChangeQuery({ page: value })}
        pageList={pageList}
        isHasNextPage={isHasNextPage}
      />
    </div>
  )
}
