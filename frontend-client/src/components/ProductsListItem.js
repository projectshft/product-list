const ProductsListItem = ({product}) => {
  return (
    <div className="m-3 p-3 border product rounded">
      <div className="row">
        <div className="col-md-6">
          <p>Category: {product.category}</p>
        </div>
        <div className="col-md-6 text-end">
          <h4>${product.price}</h4>
        </div>
      </div>
      <img className="img-thumbnail mb-2" src={product.image} alt="..."/>
      <h3>{product.name}</h3>
    </div>
  ) 
}

export default ProductsListItem;