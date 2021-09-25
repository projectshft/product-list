const SingleProduct = ({product}) => {
  console.log(product);
  return (
  <div className='container'>
    <div className='row'>
      <div className='col'>
        <h1>{product[1].name}</h1>
      </div>
    <div className='row'>
      <h2>{product[1].price}</h2>
      <h2>{product[1].category}</h2>
    </div>
    <div className='row'>
      <div className='col'>
      <h1>hey.</h1>
    </div>
    </div>
  </div>
 
  </div>

  )
}

export default SingleProduct