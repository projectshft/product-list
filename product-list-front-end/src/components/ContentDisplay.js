const ContentDisplay = (props) => {
  const products = props.products
  console.log(products)
  return (
    <div>
      <div>
      {products.map((data, index) => (
          <div id="product" key={index}>
            <div id="category" >category: {data.category}</div>
            <div id="price">price: {data.price}</div>
            <img id="img" src={data.image} alt="new"/>
            <div id="name">name: {data.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
  
  
}

export default ContentDisplay;