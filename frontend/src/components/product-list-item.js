const ProductListItem = ({product}) => {
  return (
    <div>
      <p>Category: <strong>{product.category}</strong></p>
      <p>Price: <strong>{product.price}</strong></p>
      <img src={product.image} alt={product.name}></img>
      <p><strong>{product.name}</strong></p>
    </div> 
  )
}

export default ProductListItem;