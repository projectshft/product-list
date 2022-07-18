import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchProducts } from './actions';
import _ from 'lodash';
import './index.css';
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';

function App () {
  const products = useSelector((state) => state.productList);
  console.log('app' + products);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [fetchProducts]);

  function renderProducts() {

    // if(!_.isEmpty(products)) {
    //   return (
    //     <table className='products-table'>
    //       <tbody>
    //         <tr>Products</tr>
    //         <tr>{displayProducts()}</tr>
    //       </tbody>
    //     </table>
    //   )
    // } else {
    // return (
    //   <div>No products</div>
    //   )
    // }
    // if(!products) {
    //   return (
    //       <div>No products</div>
    //   )
    // } else {
    return (
        <table className='products-table'>
          <tbody>
            <tr>Products</tr>
            <tr>{displayProducts()}</tr>
          </tbody>
        </table>
      )
    // }
  } 

  
  // const getProducts = (data) => {
  //   console.log(data);
  //   dispatch(
  //     fetchProducts(data)
  //   );
  // }
    // if (!products) {
    //   return <div>No Products</div>;
    // } else {
    //   if (products.length > 0) {
    //     const pName = products.map((p) => {return p.productName;})
    //     return(<p>{pName}</p>);
    //   } else {
    //     return <p>None</p>
    //   }
    // }
  

  const displayProducts = () => {
    if (!products) {
      return <div>No Products</div>;
    } else {
      return products.map((p) => 
          // <tr>
            <td>
              <div className='product-display'>
                <ul>
                  <li>{p.productName}</li>
                  <li>{p.productCategory}</li>
                  <li><img src={p.productImg} /></li>
                  <li>{p.productPrice}</li>
                </ul>
              </div>
            </td>
          // </tr>
      )
    }
  }

  return (
    <div className='products'>
      <table className='search-table'>
        <thead>
          <tr>
            <th>Search</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {/* <form onSubmit=
              {getProducts()}
              >
                <input className='search'
                  name='product-search'
                  // ref={register}
                  >
                </input>
                <select className='category'
                  name='category-search'
                  // ref={register}
                  >
                  <option value={'Toys'}>Toys</option>
                  <option value={'Automotive'}>Automotive</option>
                </select>
                <select className='price'
                  name='price-sort'
                  // ref={register}
                  >
                  <option value={'Highest'}>Highest</option>
                  <option value={'Lowest'}>Lowest</option>
                </select>
                <button className='btn btn-primary' type='submit'>Search</button>
              </form> */}
            </td>
          </tr>
        </tbody>
      </table>

      {renderProducts()}
    </div>
  )

}


export default App;