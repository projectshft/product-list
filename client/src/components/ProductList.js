import Product from './Product';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getCount } from "../store"


function ProductList() {
  const dispatch = useDispatch();
  let { data } = useSelector((state) => {
    console.log(state.products,'state.products')
    return state.products
  })
  let { count } = useSelector((state) => {
    console.log(state.count,'state.count')
    return state.count
  })
  //state.data = action.payload in reducer

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCount());
  }, [dispatch]);



  console.log(data, 'data after dispatch before map');
  console.log(count, 'count after dispatch');
  
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
    </div>
  )
};
export default ProductList;