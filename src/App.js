import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { fetchProducts } from './actions';
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';

function App () {
  const products = useSelector((state) => state.products);
  console.log('app' + products);
  const dispatch = useDispatch();

  const renderProducts = () => {
    return (
      <table className='products-table'>
        <tbody>
          <tr>Products</tr>
          <tr>{getProducts()}</tr>
        </tbody>
      </table>
    )
  } 

  const getProducts = () => {
    dispatch(
      fetchProducts()
    );
    if (!products) {
      return <div>No Products</div>;
    } else {
      if (products.length > 0) {
        const pName = products.map((p) => {return p.productName;})
        return(<p>{pName}</p>);
      } else {
        return <p>None</p>
      }
    }
  }

  return (
    <div className='products'>
      <table className='search-table'>
        <thead>
          <tr>
            <th>Search</th>
            <th>Category</th>
            <th>Sort</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Search Form</td>
            <td>Category Drop-down</td>
            <td>Sort Options</td>
          </tr>
        </tbody>
      </table>

      {renderProducts()}
    </div>
  )

}


export default App;