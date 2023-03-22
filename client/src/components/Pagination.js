// import axios from "axios"
// import { useEffect, useState } from "react"


// const Pagination = () => {
//   const [page, setPage] = useState(1)
//   const [pageCount, setPageCount] = useState(0)

//   const res = axios.get(`http://localhost:8000/products?page=${page}`)

//   useEffect(() => {
//     if(res) {
//       // setPageCount()
//     res.then((data) => {
//       console.log(data.data.pagination.pageCount)
//       setPageCount(data.data.pagination.pageCount)
//     })
//     }
//   }, [res])

//   function handlePrevious() {
//     setPage((p) => {
//       if (p === 1) {
//         return p;
//       } else {
//         return p - 1;
//       }
//     })
//   }

//   function handleNext() {
//     setPage((p) => {
//       if (p === pageCount) {
//         return p;
//       } else {
//         return p + 1;
//       }
//     })
//   }

//   return (
//     <div className='text-center mt-4'>
//       Page: {page}
//       Page Count: {pageCount}
//       <button className="btn btn-outline-secondary" disabled={page === 1} onClick={handlePrevious}>Prev</button>
//       <button className="btn btn-outline-secondary" disabled={page === pageCount}onClick={handleNext}>Next</button>
//     </div>
//   );
// }
 
// export default Pagination;