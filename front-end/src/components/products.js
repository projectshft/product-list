import ProductDetail from "./product-detail"

function Products() {
  const renderProductDetail = function(info) {
    return info.map((product) => <ProductDetail key={product._id} product={product} />)
  }
  return (
    <div>
      {renderProductDetail()}
    </div>
    
  )
}

export default Products