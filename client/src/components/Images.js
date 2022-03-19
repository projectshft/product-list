import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions'; 
import Pagination from './Pagination'



function Images() {
  const dispatch = useDispatch();

  //Load all products upon openning
  useEffect(() => {
    dispatch(fetchProducts("","",""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

const products = useSelector((state) => state.products);
 console.log(products);

 const renderProducts = () => {
      if(!products) {
        return <h2>There are no items to display</h2>
      }
      if (products) {
        return products?.products?.products?.map((product, i) => (
      <div className="card-group" key={i}>
      <div className="card">
        <div className="card-heading">
      <p>Category: <span className="category">{product.category}</span></p>
      <h3>${product.price}</h3>
      </div>
      <img src={product.image}className="card-img-top" alt={product.name}/>
      <div className="card-body">
      <h2 className="card-title">{product.name}</h2>
      </div>
      </div>
     </div>
    ));
    };
  } 
  return (
  <div>
  <div className="container image-container">
  {renderProducts()}
  </div>
    <Pagination />
  </div>
    )
  };
  



export default Images