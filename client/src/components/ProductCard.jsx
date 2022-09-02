const ProductCard = () => {
  return (
    <div className="col d-flex justify-content-center">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body py-2">
          <div className="row align-items-end">
            <div className="col pb-1">
              <div style={{ "font-size": "0.8rem" }}>
                Category: <strong>Garden</strong>
              </div>
            </div>
            <div className="col-auto">
              <div className="fs-5 fw-bold">764</div>
            </div>
          </div>
          <div className="card-image-top bg-secondary ratio ratio-4x3 my-3 rounded-1"></div>
          <h5 className="card-title">Slick Plastic Keyboard</h5>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
