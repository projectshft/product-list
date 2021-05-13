import { getProducts } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Pagination from './pagination'
import SearchBar from './searchBar'
import ProductArea from './productArea'

import { useEffect } from 'react'

const Container = () => {
  const { products, count, categories } = useSelector(state => state.storeData);
  let options = {}
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(options));
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
    if (!_.isEmpty(categories)) {
      return (
        <SearchBar categoryData={categories}></SearchBar>
      );
    }
  };

  return (
    <div>
      <div>{renderSearchArea()}</div>
      <div>{renderBody()}</div>
    </div>
  );
};



export default Container;