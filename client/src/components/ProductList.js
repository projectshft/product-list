import Product from './Product';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getCount } from "../store"
import Page from './Page';

function ProductList() {
  const dispatch = useDispatch();

  // const [sortPrice, setSortPrice] = useState('highest');
  // const [sortCategory, setSortCategory] = useState('all');

  let { data, page } = useSelector((state) => {
    console.log(state.products,'state.products')
    return state.products
  });
  let { count } = useSelector((state) => {
    console.log(state.count,'state.count')
    return state.count
  });

  //state.data = action.payload in reducer

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCount());
  }, [dispatch]);

  const pages = [];
  for (let i = 0; i < Math.ceil(count / 9); i++) {
    pages.push(i + 1);
  }

  const handlePageChange = (pageNumber) => {
    console.log(`page: ${pageNumber}`);
    dispatch(getProducts(pageNumber));
  }

  const renderedPages = pages.map((page) => {
    return (
      <div className='pageList' key={page}>
        <Page number={page} onPageChange={handlePageChange}></Page>
      </div>
    );
  });
  
  const renderedProducts = data.map((product) => {
    return (
      <div className='list-container' key={product._id}>
        <Product price={product.price} category={product.category} image={product.image} name={product.name}/>
      </div>
    )
  })

  return (
    <div className='product-list-container'>
      <div className='list-container'>
        {renderedProducts}
      </div>
      <div className='count-container'>
        Products: {count}
      </div>
      <div className='pagination-container'>
        {renderedPages}
      </div>
    </div>
  )
};

export default ProductList;