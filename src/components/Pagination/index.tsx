// Style
import './style.css'

interface PaginationProps {
  /**
   * How many total pages there are
   */
  totalPages: number;
  /**
   * The current page
   */
  page: number;
  /**
   * The function that runs when a pagination item is clicked
   */
  handlePageChange: (page: number) => void;
}

const Pagination = ({totalPages, page, handlePageChange}: PaginationProps) => {
  return (
      <div className="pagination">
        {page > 1 && <span className='pagination-number' onClick={() => {handlePageChange(page - 1)}}>&#8592;</span>}
        {[...Array(totalPages)].map((_page: number, i: number) =><span className={`pagination-number ${page === i + 1 ? 'pagination-number-active' : ''}`} key={`page-${i}`} onClick={() => {handlePageChange(i + 1)}}>{i + 1}</span>)}
        {page < totalPages && <span className='pagination-number' onClick={() => {handlePageChange(page + 1)}}>&#8594;</span>}
      </div>

  );
};

export default Pagination;
