import { useSelector } from "react-redux";

const Products = () => {
  const productData = useSelector(state => state.productData);

  return (
    <div className="products container text-center pt-4">
      <div className="row">
      {productData && productData.map(product => (
          <div className="col-4 border" key={product._id}>
            <p>Category: <strong>{product.category}</strong></p>
            <p>Price: <strong>{product.price}</strong></p>
            <img className="img-fluid" src={product.image} alt="/"/>
            <h4>{product.name}</h4>
          </div> 
        ))}
      </div>
    </div>
  );
}
 
export default Products;