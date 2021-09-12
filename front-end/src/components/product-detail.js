export default function ProductDetail({product}) {
  return (
    <div className='col-md-4'>
      <div className='row'>
        <div className='card col-md-8 offset-md-2'>
          <div className='card-body '>
            <p>Category: {product.category} Price: ${product.price}</p>
            <img src={product.image} alt='product'/>
            <h3>{product.name}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}