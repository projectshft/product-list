import { useSelector } from "react-redux";

const ContentDisplay = () => {
  const productData = useSelector(state => {
    
    if (state.products.length <= 1) {
      return state.products[0]
    } else {
      return state.products[state.products.length - 1];
    }
    
  });

  const searchTerm = useSelector(state => {
    return state.search;
  })

  console.log(searchTerm)

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
            {productData.map((data, index) => (
              <div className="col-sm-4" key={index}>
                  <div id="product">
                    <div id="category" >Category: {data.category}</div>
                    <div id="price">Price: {data.price}</div>
                    <img id="img" src={data.image} alt="new"/>
                    <div id="name">Name: {data.name}</div>
                  </div>
              </div>
            ))}
        
        </div>
      </div>
    </div>
  )
  
  
}

export default ContentDisplay;