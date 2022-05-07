const ContentDisplay = (props) => {
  const products = props.products
  console.log(products)
  return (
    <div>
      <div>ContentDisplay.js Test</div>
      <div>
      {products.map((prod) => (
          <div className='card'>
            {prod.category}
          </div>
        ))}
      </div>
    </div>
  )
  
  
}

export default ContentDisplay;