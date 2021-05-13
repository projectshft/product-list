import { getProducts } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Pagination from './pagination'
import SearchBar from './searchBar'
import ProductArea from './productArea'

import { useEffect } from 'react'

const Container = () => {
  const { products, count } = useSelector(state => state.storeData);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getProducts])

  function renderBody () {
    if (!_.isEmpty(products)) {
      return (
        <div>
          <ProductArea productData={products}></ProductArea>
          <Pagination productCount={count}></Pagination>
        </div>
      )
    };
  };

  function renderSearchArea () {
    return (
      <SearchBar></SearchBar>
    );
  };

  return (
    <div>
      <div>{renderSearchArea()}</div>
      <div>{renderBody()}</div>
    </div>
  );
};



export default Container;