import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllProducts } from "./actions";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div key={product._id}>
            <div className="col-md-4">
              <div className="allinfo card">
                <img
                  src={product.image}
                  className="productimg card-img-top"
                  alt=""
                />
                <button className="card-text">
                  <strong>Reviews: </strong>
                  {product.review}
                </button>
                <div className="card-body">
                  <h5 className="prodname card-title">{product.name}</h5>
                  <p className="prodcategory cart-text">
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p className="prodprice card-text">
                    <strong>$</strong>
                    {product.price}.00
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
