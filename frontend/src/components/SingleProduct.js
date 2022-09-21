import React from 'react'
import { useSelector } from 'react-redux'

const SingleProduct = () => {
  const SingleProductInfo = useSelector((state)=> state.productState)

  return (
    <div>
      <h1>Single Product</h1>
    </div>
  )
}

export default SingleProduct