import {useSelector} from 'react-redux'
import { useState } from 'react' 
import {Pagination } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { getPage } from '../actions/actions'
import './components-css.css'

const Paginate = () => {

  const dispatch = useDispatch()

  // prev page and next page variables to be used in funcction blocks
  let prevPage, nextPage;

  // total pages from back end
  const totalPages = useSelector(state => state.products.totalPages)
  //page number from back end
  const pageNum = useSelector(state => state.products.pageNum)

  // handles the clicked number
  const getNumClick = (e) => {
    dispatch(getPage(Number(e.target.innerHTML)))
  }

// handles the prev page click
  const getPrevClick = () => {
    if(pageNum === 1){
     prevPage = 1
    }
    else {
      prevPage = pageNum - 1
      dispatch(getPage(prevPage))
    }
  }

  //handles next page click
  const getNextPage = () => {
    if(pageNum === totalPages){
      nextPage = totalPages
    }
    else {
      nextPage = pageNum + 1
      dispatch(getPage(nextPage))
    }
  }

  // renders page numbers based off of whats returned from back end
  const paginateNumbers = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(   
        <Pagination.Item onClick={getNumClick} key={number} active={number === pageNum}>
          {number}
        </Pagination.Item>

      )
    }
    return items
  }
 

  return (
    <div className="paginate-conatainer">
      <br />
      <Pagination className="text-center">
        <Pagination.Prev onClick={getPrevClick}/>
        {paginateNumbers()}
        <Pagination.Next onClick={getNextPage}/>
      </Pagination> 
    </div>
  )
}


export default Paginate