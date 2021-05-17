import react, {useEffect, useState} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { getProducts } from './actions'

// it gets the initial load and and displays the product

const  Products = () => {


  let mappedData;

  const data = useSelector(state => state.products)
  

  for(let i = 0; i < data.length; i++){
    const currElem = data[i]
    
    mappedData = currElem.map((product) => {
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

  }

  return (
    <div className="container-fluid">
     
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
  </div>
  )
    
}


export default Products