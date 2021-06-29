import { useSelector } from "react-redux"




const ProductsBody = () => {
  
  
  const productData = useSelector(state => state.products.products)

    // maps through the products and returns a card element
    const mappedData = productData.map((product) => {
      return (
        <div key={product.name} style={{width: "20vw"}} className="p-3">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-auto">
                <p className="card-text">Category: <b>{product.category}</b></p>
              </div>
              <div className="col">
                <h5 className="text-end"><b>${product.price}</b></h5>
              </div>
             </div>
            <img className="card-img pb-2" src={product.image} alt="img"/>
            <h5 className="card-title">{product.name}</h5>
          </div>
        </div>
      </div> 
      )
    })

    // function to check if products is populated if not render products not found element
    const renderProducts = () => {
      if (productData.length){
        return (
          <>
            <div className="row">
              <div className="col-md-4">{mappedData[0]}</div>
              <div className="col-md-4">{mappedData[1]}</div>
              <div className="col-md-4">{mappedData[2]}</div>
            </div>
            <div className="row">
              <div className="col-md-4">{mappedData[3]}</div>
              <div className="col-md-4">{mappedData[4]}</div>
              <div className="col-md-4">{mappedData[5]}</div>
            </div>
            <div className="row">
              <div className="col-md-4">{mappedData[6]}</div>
              <div className="col-md-4">{mappedData[7]}</div>
              <div className="col-md-4">{mappedData[8]}</div>
            </div>
          </>
        )
      }
      else {
        return <h4 className="mt-4">No products found.</h4>
      }
    }

  return (
    <div className="container-fluid">
      {renderProducts()}
    </div>
  )
}

export default ProductsBody