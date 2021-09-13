import { useSelector } from 'react-redux'

const Products = () => {
  const products = useSelector((state) => state.products[0].products);  

  // eslint-disable-next-line array-callback-return
  const productDisplay = function() {
  
    return products.map((product) => {
    return (
    <div className="col-4">
      <div className="card" key={product._id}>
        <h5 className="cat-title">Category: {product.category}</h5>
        <h3 className="price">{product.price}</h3>
        <img src={product.image} alt={product.name} className="card-img"></img>
        <div className="card-body">
          <h3 className="card-text">{product.name}</h3>
        </div>
      </div>
    </div>   
    )})}
  

  return (    
  <div className="row">
    {productDisplay()}
  </div>
       
  )

}

export default Products;