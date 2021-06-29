import {useSelector} from 'react-redux'
import { useState } from 'react' 
import {Pagination } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { getPage } from '../actions/actions'

const Paginate = () => {

  const dispatch = useDispatch()

  const totalPages = useSelector(state => state.products.totalPages)
  const pageNum = useSelector(state => state.products.pageNum)

  


  const getNumClick = (e) => {
    dispatch(getPage(Number(e.target.innerHTML)))
  }

  const paginateNumbers = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(   
        <Pagination.Item key={number} active={number === pageNum}>
          {number}
        </Pagination.Item>

      )
    }
    return items
  }
 

  return (
    <div>
       <br />
       
        <Pagination onClick={getNumClick}>
            <Pagination.Prev />
            {paginateNumbers()}
            <Pagination.Next />
        </Pagination>
       
      </div>
  )
}


export default Paginate