import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Pagination = ({onChange, page}) => {
  const [pageCount, setPageCount] = useState(0)
  const productData = useSelector(state => state.productData);

  useEffect(() => {
    if(productData) {
      setPageCount(productData.pagination.pageCount)
    }
  }, [productData])

  function handlePrevious() {
    onChange(page -= 1)
  }

  function handleNext() {
    onChange(page += 1)

  }

  return (
    <div className='text-center mt-4'>
      <div>Page {page} of {pageCount}</div>
      <br/>
      <button className="btn btn-dark" disabled={page === 1} onClick={handlePrevious}>Prev</button>
      <button className="btn btn-dark" disabled={page === pageCount}onClick={handleNext}>Next</button>
    </div>
  );
}

export default Pagination;