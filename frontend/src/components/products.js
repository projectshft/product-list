import { useSelector } from "react-redux"

const Products = () => {
  const products = useSelector((state) => state.products);
  console.log(products);

  const renderProducts = () => {
    return products.map((product) => {
      return (
        <div key={product._id}>
          <p>Category: {product.category}</p>
          <p>Price: {product.price}</p>
          <img src={product.image} alt={product.name}></img>
          <p>{product.name}</p>
        </div>
      )
    })
  }

  return (
    <div>
      {renderProducts()}
    </div>
  )
}

export default Products;