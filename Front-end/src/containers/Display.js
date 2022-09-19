import { useSelector } from "react-redux";
const Display = () => {
  const productObject = useSelector((state) => state.product.prevSearch);

  console.log("product", productObject);
  if (productObject) {
    return (
      <div className="card-group container">
        <div className="row">
          {productObject.docs.map((item) => (
            <div className="card col-4" key={item._id}>
              <img
                className="card-img-top"
                src={item.image}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.category}</p>
                <p className="card-text">
                  <small className="text-muted">${item.price}.00</small>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
// if
export default Display;
