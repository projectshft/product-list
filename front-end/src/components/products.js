import {  useSelector } from "react-redux";

const Product = (props) => {
  // select product from the global state
  const product = useSelector((state) => state.products.items);

  function renderProducts() {
    if (product.length > 0) {
      return product.map((p) => (
        <div className="col-sm-3 p-2 m-4">
          <div className="bg-white p-2">
            <div className="d-flex justify-content-between pb-1">
              <div>
                Category: <strong>{p.category}</strong>
              </div>
              <div>
                {" "}
                <h4>{p.price}</h4>{" "}
              </div>
            </div>
            <div className="pb-3">
              <img
                src="https://image.shutterstock.com/image-photo/carrot-googly-eyes-funny-face-260nw-1724110894.jpg"
                alt="product"
                className="img-fluid"
              ></img>
            </div>
            <div>
              <h4>{p.name}</h4>
            </div>
          </div>
        </div>
      ));
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">{renderProducts()}</div>
      </div>
      <div>page number</div>
    </div>
  );
};

export default Product;
