import { useSelector } from "react-redux";

const ContentDisplay = (props) => {
  const productData = useSelector(state => state);

  const products = props.products;

  console.log(productData)

  //this might be helpful: https://stackoverflow.com/questions/69391989/react-why-is-my-variable-only-defined-on-the-first-render-but-undefined-on-subs 
   
  //const returner = async (productData) => {
  //   const x = await productData.map(y => y)
  //   return x
  // }

  // console.log(returner())

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
            {products.map((data, index) => (
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