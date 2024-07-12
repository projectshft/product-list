export function ProductCard({
  name = '',
  category = '',
  price = '',
  image = '',
}) {
  return (
    <div className="col">
      <div className="card">
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
            <div>
              {/* className="d-flex justify-content-center" */} 
              <img src={image} className="img-thumbnail" alt="..."/>
            </div>
            <div>
              <h3>{name}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
