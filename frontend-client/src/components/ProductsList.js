import { useSelector } from "react-redux"
import ProductsListItem from "./ProductsListItem"

const ProductsList = () => {
  const products = useSelector(({products}) => products.products);
  const generateProductsList = (products) => {
    return products.map((product) => {
      return (
        <div className="col-md-4">
          <ProductsListItem product={product}/>
        </div>
      )
    })
  }
  return (
    <div className="row">
      {generateProductsList(products)}
    </div>
  )
}

export default ProductsList;