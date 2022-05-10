import { useSelector } from "react-redux";

const ContentDisplay = (props) => {
  const products = props.products

  const productData = useSelector(state => state);

  console.log(productData)

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          
            {productData[0].map((data, index) => (
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