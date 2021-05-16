import { useSelector } from "react-redux"
import ProductsListItem from "./ProductsListItem"

const ProductsList = () => {
  const products = useSelector(({products}) => products.products);
  const generateNoResultsMessage = () => {
    return (
      <div className="col-md-6 offset-md-3 text-center mb-3">
        <h3>No products found matching those criteria</h3>
      </div>
    )
  }
  const generateProductsList = (products) => {
    return products.map((product, index) => {
      return (
        <div key={index} className="col-md-4">
          <ProductsListItem product={product}/>
        </div>
      )
    })
  }
  return (
    <div className="row">
      {products.length !== 0 ? generateProductsList(products) : generateNoResultsMessage()}
    </div>
  )
}

export default ProductsList;