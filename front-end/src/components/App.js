import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../actions";
import { useEffect } from "react";
import { current } from "@reduxjs/toolkit";


function App() {
  // debugger;
  const dispatch = useDispatch();

  const productList = useSelector(state => state.products);

  // console.log('productCount: ', productList.productCount);

  // useEffect(() => {
  //   dispatch(fetchProducts())
  // }, [dispatch])

  let currentProducts = [];
  if(productList) {
    currentProducts = productList.products;
  }


  // console.log('app products: ', 'state.products: ', productList.products.products);
// if(productList) {
    // const renderProducts = () => {
    // const mappedProducts = currentProducts.map((product, i) => {
    //   let name = product.name
    //   let category = product.category
    //   let price = product.price
    //   let image = product.image
    //   return (
    //     <div className="col" key={i}>
    //     <div className="card">
    //       <img src={image} className="card-img-top" alt="..."/>
    //       <div className="card-body">
    //         <h3 className="card-title">{name}</h3>
    //         <h5 className="card-title">Price: {price}</h5>
    //         <p className="card-text">Category: {category}</p>
    //       </div>
    //     </div>
    //   </div>
    //   )
    // })
  //   return (mappedProducts);
  // }
  // const productsIndex = renderProducts();

  return (
    <div>
      <div className="container" id="products-container">
        <div className="row row-cols-1 row-cols-sm-3 g-3">
          {/* renderProducts would be called here {renderProducts()} */}
          {currentProducts.map((product, i) => {
      let name = product.name
      let category = product.category
      let price = product.price
      let image = product.image
      return (
        <div className="col" key={i}>
        <div className="card">
          <img src={image} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h3 className="card-title">{name}</h3>
            <h5 className="card-title">Price: {price}</h5>
            <p className="card-text">Category: {category}</p>
          </div>
        </div>
      </div>
      )
    })}
          {/* <div className="col">
            <div className="card">
              <img src="https://via.placeholder.com/250?text=Product+Image" className="card-img-top" alt="..."/>
              <div className="card-body">
                <h3 className="card-title">Product Name</h3>
                <h5 className="card-title">Price: (price)</h5>
                <p className="card-text">Category: (category name)</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src="https://via.placeholder.com/250?text=Product+Image" className="card-img-top" alt="..."/>
              <div className="card-body">
                <h3 className="card-title">Product Name</h3>
                <h5 className="card-title">Price: (price)</h5>
                <p className="card-text">Category: (category name)</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src="https://via.placeholder.com/250?text=Product+Image" className="card-img-top" alt="..."/>
              <div className="card-body">
                <h3 className="card-title">Product Name</h3>
                <h5 className="card-title">Price: (price)</h5>
                <p className="card-text">Category: (category name)</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled"><a className="page-link">Previous</a></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>  
    </div>
  );
}

export default App;
