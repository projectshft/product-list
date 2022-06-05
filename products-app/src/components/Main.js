import { fetchProducts } from "../actions/index"
import { useSelector } from "react-redux";

function Main () {
  fetchProducts()
  const products = useSelector((state) => state.products);
  const loadProducts = () => {
    return products[0].map((product) => {
      return (
        <div className="card product-div col-lg-3" key={product._id}>
          <p>Category: <strong>{product.category}</strong></p>
          <p>${product.price}</p>
          <img src={product.image} alt="Product Here" />
          <h3>{product.name}</h3>
        </div>
      )
    })
  }
  return (
    <div>
      <div id="products" className="container d-flex p-2">
        <div className="row text-center products">
          {loadProducts()}  
        </div>
      </div>
      <br />
      <p><strong>1</strong> 2 3 4 5 6 7 8 9 10</p>
    </div>
  )
}

export default Main;