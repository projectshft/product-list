import { loadProducts } from "../reducers/productsSlice";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const productsState = useSelector(state => state.products.products)

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const renderProducts = () => {
   if (productsState) {
    return productsState.map((product, index) => {
      return (
        <div className="cell prod col-md-9 offset-2" key={index}>
          <div className="top-row">
            <div className="category">Category: {product.category}</div>
            <div className="price">{product.price}</div>
          </div>
          <img className="image" src={product.image} alt="pic of product"></img>
          <div className="product-name">{product.name}</div>
        </div>
      );
    });
   } 

   else {
     return (
       <div className="not-found offset-1">Sorry, no products found.</div>
     )
   }
  }
  
  return (
    <div className="grid">{renderProducts()}</div>
  )
};

export default Products;