import ProductDetail from "./product-detail"
import {useDispatch, useSelector} from "react-redux"
import React from "react"
import { fetchProducts } from "../actions"

function Products() {
  const product = useSelector((state) => state.products)
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch(fetchProducts())
  },[]) 

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