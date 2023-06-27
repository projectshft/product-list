import { useSelector } from "react-redux";

const Products = () => {
  
  const productData = useSelector((state) => state.productData);
  console.log(productData);

  const renderProductDisplayList = () => {
    if (productData.products) {
      return productData.products.map((product) => {
        return (
          <div className="col-md-4 mb-5" key={product._id}>
            <div className="border col-md-11 product-card">
              <div className="row d-flex justisfy-content-around">
                <div className="col offset-md-1 d-flex product-category">Category: <strong>{product.category}</strong></div>
                <h4 className="col d-flex product-price"><strong>{product.price}</strong></h4>
              </div>
              <div className="bottom-container">
                <img className="mb-1" src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
              </div>
            </div>
          </div>
        )
      })
    }
  }

  return (
    <div className="container row text-center">
      {renderProductDisplayList()}
    </div>
  )
};

export default Products;