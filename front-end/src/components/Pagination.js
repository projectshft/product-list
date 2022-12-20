// import { fetchProducts } from '../helpers/fetchProducts';
// import { useState } from 'react'
// import { useSelector } from 'react-redux'

// const Pagination = () => {

    
//     const total = useSelector((state) => state.total)
//     const perPage = 9
//     const numOfPages = Math.ceil(total / perPage)
//     const pages = []
//     for (let i = 1; i <= numOfPages; i++){
//         pages.push(i)
//     }

//     const handlePageChange = (number) => {
//         setPage(number)
//         console.log(number)
//     }

//     const renderPageNumbers = () => {
       
//        return pages.map(number => {
//         const isCurrentPage = number === page;
//         const className = isCurrentPage ? "page-number-link current" : "page-link";
//         return (
//             <div className="page-number-button"><span className={className}><a onClick={() => handlePageChange(number)}>{number}</a></span></div>
//         )})

//     }


//     return (
//         <div className='pagination-box'>
//             {renderPageNumbers()}
//         </div>
//     )

// }

// export default Pagination;