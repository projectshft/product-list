const ProductCard = ({ product }) => {
  return (
    <div className="col d-flex justify-content-center">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body py-2">
          <div className="row align-items-end">
            <div className="col pb-1">
              <div style={{ "fontSize": "0.8rem" }}>
                Category: <strong>{product.category}</strong>
              </div>
            </div>
            <div className="col-auto">
              <div className="fs-5 fw-bold"><sup>$</sup>{product.price}</div>
            </div>
          </div>
          <div className="card-image-top bg-secondary ratio ratio-4x3 my-3 rounded-1"></div>
          <h5 className="card-title">{product.name}</h5>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
