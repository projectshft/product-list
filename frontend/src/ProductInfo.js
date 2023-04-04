const ProductInfo = ({ products }) => {
  const NoProducts = () => {
    if (products.length === 0) {
      return (
        <h1>
          <strong>No Products With That Name!!!!</strong>
        </h1>
      );
    }
  };

  const ProductDetail = ({ prod }) => (
    <div className="col-md-4">
      <div className="allinfo card">
        <img src={prod.image} className="productimg card-img-top" alt="" />
        <button className="card-text">
          <strong>Reviews: </strong>
          {prod.review}
        </button>
        <div className="card-body">
          <h5 className="prodname card-title">{prod.name}</h5>
          <p className="prodcategory cart-text">
            <strong>Category:</strong> {prod.category}
          </p>
          <p className="prodprice card-text">
            <strong>$</strong>
            {prod.price}.00
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <div className="container">
      <div className="row">
        <NoProducts />
        {products.map((product) => (
          <ProductDetail key={product._id} prod={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
