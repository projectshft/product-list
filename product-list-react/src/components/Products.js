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
        <div className="cell col-md-4 offset-2" key={index}>
          <div>
            <div>{product.category}</div>
            <div>{product.price}</div>
          </div>
          <img src={product.image} alt="pic of product"></img>
          <div>{product.name}</div>
        </div>
      );
    });
   } 
  }
  
  return (
    <div className="grid">{renderProducts()}</div>
  )
};

export default Products;