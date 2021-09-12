import { useSelector } from "react-redux"
import ProductListItem from "./product-list-item";

const Products = () => {
  const products = useSelector(state => state.products);

  const renderProducts = () => {
    return products.map((product) => {
      return (
        <div key={product._id} className="col-md-4">
          <ProductListItem product={product}/>
          <hr></hr>
        </div>
      )
    })
  }

  return (
    <div className="row">
      {renderProducts()}
    </div>
  )
}

export default Products;