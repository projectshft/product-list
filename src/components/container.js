import { getProducts } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { useEffect } from 'react'

const Container = () => {
  const data = useSelector(state => state.products);
 // console.log(data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
  // eslint-disable-next-line react-hooks/exhaustive-deps
},  [getProducts])

//needs edge handling for returns of less than 9

function renderBody () {
  if (!_.isEmpty(data.products)) {
    console.log(data)

   
    const productMap = data.products[0].map(item => 

    <div key={item.name} style={{width: "18rem"}}>
      <div className="card">
        <img className="card-img-top" src={item.image} alt="img"/>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">Category: {item.category}</p>
          <p className="card-text">Price ${item.price}</p>
        </div>
      </div>
    </div>

    );

     return (
      <div className="container-fluid">
      <div className="row">
      <div className="col-md-4">{productMap[0] || null}</div>
      <div className="col-md-4">{productMap[1] || null }</div>
      <div className="col-md-4">{productMap[2] || null }</div>
      </div>
      <div className="row">
      <div className="col-md-4">{productMap[3] || null }</div>
      <div className="col-md-4">{productMap[4] || null }</div>
      <div className="col-md-4">{productMap[5] || null }</div>
      </div>
      <div className="row">
      <div className="col-md-4">{productMap[6]}</div>
      <div className="col-md-4">{productMap[7] || null}</div>
      <div className="col-md-4">{productMap[8] || null}</div>
      </div>
   </div>
    )
  }
}


function renderSearchArea () {
  return (
    <div className="container-fluid">
      <form>
        <div className="row">
          <div className="col-7">
            <input type="text" className="form-control col mr-1 mt-1 mb-1" />
          </div>
        
            <select className="custom-select col m-1" defaultValue="Choose...">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
            </select>
       
         
            <select className="custom-select col m-1" defaultValue="Choose...">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
            </select>
       
        </div>
      </form>
    </div>
  )
}

return (
<div>


<div>{renderSearchArea()}</div>
<div>{renderBody()}</div>

</div>







)

}



export default Container;