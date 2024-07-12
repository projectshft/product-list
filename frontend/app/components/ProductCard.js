export function ProductCard({
  name = '',
  category = '',
  price = '',
  image = '',
}) {
  return (
    <div className="card">
      <div className="card-body">
        <h3>{name}</h3>
        <div className="d-flex justify-content-between">
          <div>
            Category: <strong>{category}</strong>
          </div>
          <div>
            <strong>${price}</strong>
          </div>
        </div>
        
        <img src={image} className="img-thumbnail" alt="..."/>
      </div>
    </div>
  );
}
