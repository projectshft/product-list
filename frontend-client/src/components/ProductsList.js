import ProductsListItem from "./ProductsListItem"

const ProductsList = () => {
  const dummyProducts = [1,2,3,4,5]
  const generateProductsList = (products) => {
    return products.map((product) => {
      return (
        <div className="col-md-4">
          <ProductsListItem/>
        </div>
      )
    })
  }
  return (
    <div className="row">
      {generateProductsList(dummyProducts)}
    </div>
  )
}

export default ProductsList;