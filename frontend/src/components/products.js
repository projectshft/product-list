import _ from "lodash";

const Products = (props) => {
  if (!_.isEmpty(props.products)) {
    return props.products.map((product) => (
      <div className="products-layout col-md-4" key={product.id}>
        <div className="product border">
          <br />
          <div className="category text-left">
            Category: <strong>{product.category}</strong></div><div className="price text-right">  Price: ${product.price}</div>
          <img src={product.image} alt="product"></img>
          <div>{product.name}</div>
        </div>
      </div >
    ));
  }
  return <div>Nothing here!</div>
}

export default Products;