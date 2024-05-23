type Props = {
  currentPage: number
  pageList: Array<number>
  isHasNextPage: boolean
  onChangePage: (page: number) => void
}
export default function Pagination(props: Props) {
  const { currentPage, pageList, isHasNextPage, onChangePage } = props
  return (
    <div aria-label='...'>
      <div className='pagination justify-content-center'>
        <div className={`page-item ${currentPage! == 1 ? 'disabled' : ''}`}>
          <button className='page-link' disabled={currentPage! == 1} onClick={() => onChangePage(currentPage! - 1)}>
            Previous
          </button>
        </div>
        {pageList.map((pageNumber: number) => (
          <div className='page-item' key={'page-' + pageNumber}>
            <button
              className={`page-link ${currentPage! == pageNumber ? 'active' : ''}`}
              onClick={() => onChangePage(pageNumber)}
            >
              {pageNumber}
            </button>
          </div>
        ))}
        <div className={`page-item ${isHasNextPage ? '' : 'disabled'}`}>
          <button className='page-link' disabled={!isHasNextPage} onClick={() => onChangePage(currentPage! + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
