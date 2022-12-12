import { useEffect } from "react";
import { useState } from "react";
import { buildURL } from "../helpers/buildURL";
import { useLazyGetProductsQuery } from "../services/products";
import {usePagination, DOTS} from "../hooks/usePagination"

const Pagination = ({data, isLoading, error, currentPage, onPageChange}) => {

  let totalCount = data?.count || 0
  const pageSize = 9
  const siblingCount = 1
  

  //dynamically construct range of pagination
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  // console.log(paginationRange)

  if(currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  return (
    <ul className="flex">
      <li className="px-2" onClick={onPrevious}>{'<'}</li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="px-2" >&#8230;</li>
        }
        return(
          <li value={pageNumber} className="px-2" onClick={() => onPageChange(pageNumber)}>{pageNumber}</li>
        )
      })}
      <li  className="px-2" onClick={onNext}>{'>'}</li>
    </ul>

  )
}

export default Pagination;