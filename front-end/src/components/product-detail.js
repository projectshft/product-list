export default function ProductDetail({product}) {
  return (
    <div>
      <h2>{product.name}</h2>
      <h3>Category: {product.category}</h3>
      <h3>Price: ${product.price}</h3>
    </div>
  )
}