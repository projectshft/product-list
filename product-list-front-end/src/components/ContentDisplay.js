const ContentDisplay = (props) => {
  const products = props.products
  console.log(products)
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          
            {products.map((data, index) => (
              <div className="col-sm-4">
                <div id="product" key={index}>
                <div id="category" >category: {data.category}</div>
                <div id="price">price: {data.price}</div>
                <img id="img" src={data.image} alt="new"/>
                <div id="name">name: {data.name}</div>
              </div>
              </div>
            ))}
        
        </div>
      </div>
    </div>
  )
  
  
}

export default ContentDisplay;