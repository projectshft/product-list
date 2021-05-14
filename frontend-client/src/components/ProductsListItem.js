const ProductsListItem = () => {
  return (
    <div className="m-3 p-3 border product rounded">
      <div className="row">
        <div className="col-md-6">
          <p>Category: Garden</p>
        </div>
        <div className="col-md-6 text-end">
          <h4>$600</h4>
        </div>
      </div>
      <img className="img-thumbnail mb-2" src="https://mobileimages.lowes.com/product/converted/049206/049206040335.jpg?size=pdhi" alt="..."/>
      <h3>Shovel</h3>
    </div>
  ) 
}

export default ProductsListItem;