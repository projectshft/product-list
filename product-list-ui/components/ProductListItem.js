import React from 'react';
import Image from 'next/image';

const ProductListItem = ({product}) => {
  return (
    <div className='bg-light d-flex flex-column m-5 justify-content-center align-items-center text-align-center' style={{ width: '350px', height: '450px' }}>

      <div className='d-flex w-100 justify-content-between px-5 align-items-center mb-3'>
        <p className='mb-0'> Category: <strong>{product.category}</strong></p>
        <h3 className='mb-0'>{product.price}</h3>
      </div>
      <Image src={product.image} alt='product image' width='300' height='300'  />
      <h4 className='text-center mt-3'>{product.name}</h4>
    </div>
  )
}

export default ProductListItem;