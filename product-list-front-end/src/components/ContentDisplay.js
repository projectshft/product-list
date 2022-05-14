import { useState } from "react";
import { useSelector } from "react-redux";

const ContentDisplay = () => {
  const [pageNumber, setPageNumber] = useState(1);
  
  const urlBase = 'http://localhost:8000/products';

  const previous = '<<previous'
  const next = 'next>>'

  const productData = useSelector(state => state[0]);




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
      <div className="right-align">
          <p>{previous}</p> <p>1</p> <p>2</p> <p>3</p> <p>4</p> <p>5</p> <p>6</p> <p>7</p> <p>8</p> <p>9</p> <p>10</p><p>11</p><p>{next}</p>
        </div>
    </div>
  )
  
  
}

export default ContentDisplay;