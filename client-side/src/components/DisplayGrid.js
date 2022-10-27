import fetchedProducts from "../reducers/ProductsReducer.js";

export const DisplayGrid = () => {
  let products = fetchedProducts;
  console.log('hi');
  return (
    <div>
        <div className="row">
          <div className="col-sm-3">
            <div className="card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR6phDeYUg6EL4uNj6tdRmksE-PI9qjrbgwA&usqp=CAU"
                className="card-img-top"
                alt="your product"
              ></img>
              <div className="card-body">
                <h5 className="card-title">{products.name }</h5>
                <p className="card-text">category: {products.category}</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">
                  price: ${products.price}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DisplayGrid;