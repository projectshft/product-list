import { getProducts } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Pagination from './pagination';
import SearchBar from './searchBar';
import ProductArea from './productArea';
import { useEffect } from 'react';

const Container = () => {
  const { products, count, categories } = useSelector(state => state.storeData);
  const dispatch = useDispatch();
  let options = {};

  useEffect(() => { // loads all products on initial render
    dispatch(getProducts(options));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getProducts]);

  function renderProductDisplay () {
    if (!_.isEmpty(products)) { // if products returned from dispatch, render products/pagination
      return (
        <div>
          <ProductArea productData={products}></ProductArea>
          <Pagination productCount={count}></Pagination>
        </div>
      );
    };
  };

  function renderSearchArea () {
    if (!_.isEmpty(categories)) { // if categories returned from dispatch, render categories
      return (
        <SearchBar categoryData={categories}></SearchBar>
      );
    };
  };

  return (
    <div>
      <div>{renderSearchArea()}</div>
      <div>{renderProductDisplay()}</div>
    </div>
  );
};

export default Container;