const DropdownProducts = (props) => {
  return (
    <div className="price-products container text-center pt-0">
      <div className="row">
        {props.newProducts && props.newProducts.map(product => (
          <div className="col-4 border" key={product._id}>
            <p>Category: <strong>{product.category}</strong></p>
            <p>Price: <strong>{product.price}</strong></p>
            <img className="img-fluid" src={product.image} alt="/"/>
            <h4>{product.name}</h4>
          </div> 
        ))}
      </div>
    </div>
  );
}
 
export default DropdownProducts;