// import Product from './Product';
// import { useDispatch, useSelector } from 'react-redux';

// const ProductList = ({array}) => {
//   // const dispatch = useDispatch(); //useSelector?
//   const productPiece = useSelector((state) => state.products);
// console.log(productPiece, 'product piece');
//   const render = array.map((product) => {
//     return ( 
//       <div key={product.name}>
//         <Product price={product.price} category={product.category} image={product.image} name={product.name}/>
//       </div>
//     )
//   })
//   return (
//     <div className='list-container'>
//     {render}
//     </div>
//     );
// }

// export default ProductList;
//fetch the id for the perfect key

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../store"


function ProductList() {
  const dispatch = useDispatch();
  let { isLoading, data, error } = useSelector((state) => {
console.log(state.products, 'state of products')

    return state.products;
  })

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  //not necessary [dispatch] same as []

  if (isLoading) {
    return <div>Is loading</div>;
  }
  if (error){
    return <div>Error fetching data</div>
  }
  // data = data.products;
  console.log(data, 'data check before render');


  const renderedUsers = data.map((product) => {
    return <div key={product._id}>
      {product.name}

    </div>
  })

  return <div>
    {renderedUsers}
  </div>
};
export default ProductList;