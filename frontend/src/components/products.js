import { useSelector } from "react-redux";

// Set up products jsx to display the products that are present
const Products = () => {

  const products = useSelector((state) => state.products);
  
  
  const renderProductList = () => {
    // If no products found, display that none were found
    if (products && products.length === 0) {
      return (
        <h4>No Products Found</h4>
      );
    };

    // If there are products, render the product info onto the page
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
