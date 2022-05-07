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
          </div>
        ))}
      </div>
    </div>
  )
  
  
}

export default ContentDisplay;