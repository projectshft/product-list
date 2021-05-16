import Item from './Item'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import {firstSearch} from '../actions/index'
import Spinner from "react-bootstrap/Spinner";

function ItemContainer() {
  const currentQuery = useSelector(state => state.currentQuery)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(firstSearch());
  }, [])

  if(currentQuery.items.length === 0) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        Loading...
      </div>
    )
  }

  return (
    <>
      <div className='col-sm-6 offset-md-3'>
        {currentQuery.items.map(item=>{
          return <Item product={item} key={item._id}/>
        })}
      </div>
    </>
  );
}

export default ItemContainer;
