import { loadProducts } from "../reducers/productsSlice";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const productsState = useSelector(state => state.products)

  useEffect(() => {
    dispatch(loadProducts())
  }, [dispatch]);

  const renderProducts = () => {
    return productsState.map((product) => {
      return (
        <div>
          <div>
            <div>{product.category}</div>
            <div>{product.price}</div>
          </div>
          <img src={product.image} alt="pic of product"></img>
          <div>{product.name}</div>
        </div>
       
       
      )
    })
    
    // return (
    //   <div className="products">
    //   <div className="row">
    //     <div className="col">1</div>
    //     <div className="col">2</div>
    //     <div className="col">3</div>
    //   </div>
    //   <div className="row">
    //     <div className="col">1</div>
    //     <div className="col">2</div>
    //     <div className="col">3</div>
    //   </div>
    //   <div className="row">
    //     <div className="col">1</div>
    //     <div className="col">2</div>
    //     <div className="col">3</div>
    //   </div>
    // </div>
    // )
   
  }
  
  return (
    // <div className="products">
    //   <div className="row">
    //     <div className="col">1</div>
    //     <div className="col">2</div>
    //     <div className="col">3</div>
    //   </div>
    //   <div className="row">
    //     <div className="col">1</div>
    //     <div className="col">2</div>
    //     <div className="col">3</div>
    //   </div>
    //   <div className="row">
    //     <div className="col">1</div>
    //     <div className="col">2</div>
    //     <div className="col">3</div>
    //   </div>
    // </div>
    <div>{renderProducts()}</div>
    
  )
};

export default Products;