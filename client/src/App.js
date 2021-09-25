import { React, useEffect, useState } from 'react';

const App = () => {

  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products")
      .then(res => res.json())
      .then(
        (result) => {
          setProducts(result);
        },
        (error) => {
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="container">
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} {product.price}
          </li>
        ))}
      </ul>
      </div>
    )
  }

  
}

export default App;