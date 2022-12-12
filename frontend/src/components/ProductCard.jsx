const ProductCard = ({data, error, isLoading}) => {

  if(error) {
    return <div>Error</div>
  } else if (isLoading) {
    return <div>Loading...</div>
  } else if (data) {
    //not sure of another way to avoid nested if/else.  
    if (data.length === 0) { 
      return <div>No Results</div>
    } else {
      return ( 
        data.products.map(product => {
          return (<div key={product._id} className="flex flex-col w-96 h-96 p-2 m-3 justify-center items-center border shadow rounded-md">
            <img src={product.image}></img>
            <div>{product.name}</div>
            <div>{product.category}</div>
            <div>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'}).format(product.price)}</div>
          </div>
          )
        })
      )
    }
  } 
}

export default ProductCard;