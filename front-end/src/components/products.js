import ProductDetail from "./product-detail"
import { useSelector } from "react-redux"
import React from "react"

function Products() {
  const product = useSelector((state) => state.products)

  const renderProductDetail = function(info) {
    return info.map((product) => <ProductDetail key={product._id} product={product} />)
  }

  return (
    <div className='row'>
        {renderProductDetail(product)}
    </div>
    
  )
}

export default Products