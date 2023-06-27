import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Pagination = ({onChange, page}) => {
  const [pages, setPage] = useState(0)
  const productData = useSelector(state => state.productData.pageCount);

  useEffect(() => {
    if(productData) {
      setPage( productData.products && productData.pagination.pageCount)
    }
  }, [productData])
  // console.log(productData);
  // console.log(pages);

  function handlePrevious() {
    onChange(page -= 1)
  }

  function handleNext() {
    onChange(page += 1)
    
  }
  
  return (
    <div className="text-center mt-4">
      <div className="h5">Page {page} of {productData}</div>
      <button className="btn btn-outline-secondary page-button" disabled={page === 1} onClick={handlePrevious}>Prev</button>
      <button className="btn btn-outline-secondary page-button" disabled={page === productData}onClick={handleNext}>Next</button>
    </div>
  );
}
 
export default Pagination;