import { useSelector } from "react-redux";

const Products = () => {
  const productData = useSelector(state => state.productData);

  return (
    <div className="container text-center">
      <div className="row">
      {productData && productData.data.map(product => (
          <div className="col-4 border">
            <p>Category: <strong>{product.category}</strong></p>
            <p>Price: <strong>{product.price}</strong></p>
            <img src={product.image} alt="/"/>
            <h4>{product.name}</h4>
          </div> 
        ))}
      </div>
    </div>
  );
}

export default Products;