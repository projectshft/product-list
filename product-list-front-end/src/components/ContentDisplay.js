const ContentDisplay = (props) => {
  const products = props.products
  console.log(products)
  return (
    <div>
      <div>
      {products.map((data, index) => (
          <div className='card' key={index}>
            category: {data.category}
            price: {data.price}
            <img src={data.image} alt="new"/>
            name: {data.name}
          </div>
        ))}
      </div>
    </div>
  )
  
  
}

export default ContentDisplay;