export function ProductCard({
  name = '',
  category = '',
  price = '',
  image = '',
}) {
  return (
    <div className="col">
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              Category: <strong>{category}</strong>
            </div>
            <div>
              <strong>${price}</strong>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-center pt-2 pb-2">
              <img src={image} alt="product" />
            </div>
            <div>
              <h4>{name}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
