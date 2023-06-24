import { useSelector } from "react-redux";

const Products = () => {

  const products = useSelector((state) => state.products);
  
  const renderProductList = () => {
    if (products) {
      
      return products.map((product, i) => {

        return (
          <div className='col-md-4 mb-3' key={i}>
            <div className='border col-md-11 product'>
              <div className='row'>
                <div className='col offset-md-1 category'>Category: {product.category}</div>
                <h4 className='col price'>{product.price}</h4>
              </div>
              <img className='mb-1' src={"https://via.placeholder.com/250?text=Product+Image"} alt="product" />
              <h3>{product.name}</h3>
            </div>
          </div>
        );
      });
    };
  };

  return (
    <div className='container row text-center'>
      {renderProductList()}
    </div>
  );
};

export default Products;
