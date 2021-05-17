
import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, NavDropdown, FormControl, Form, DropdownButton, Button} from 'react-bootstrap'
import Products from './productsComponents'
import axios from 'axios'
import { getProducts, GET_PRODUCTS} from './actions'
import { useDispatch} from 'react-redux'



const  App = ()  =>{

 const dispatch =  useDispatch()

  const [valueType,setValueType]=useState('name');
  const [priceType,setPriceType] = useState('highest')
  const [pageNumber, setPageNumber] = useState(1)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

  

 useEffect(() => {
  console.log('running');
  dispatch(getProducts(pageNumber))
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[getProducts])

 const getProductAfter = async (query) => {

   try {

    const products =  await axios.get(`http://localhost:5000/products?page=${pageNumber}&name=${name}&category=${category}&sort=${priceType}`)
    console.log(products)
    dispatch({
      type: GET_PRODUCTS,
      payload: products.data
    })
   }

   catch(e){
     throw e
   }
 }

  const handleSelectType=(e)=>{
    
    setValueType(e)
    console.log(valueType);
  }

  const handlePriceType = (e) => {
    if(e == 'highest'){
      setPriceType(1)
    }
    else if (e == 'lowest'){
      setPriceType(-1)
    }
  }


  const handleOnChange = (e) => {
    if (valueType == 'name') {
      setName(e.target.value)
    }
    else if (valueType == 'category'){
      setCategory(e.target.value)
    }
    
  }

  return (

  <div className="row">
  <Navbar>

        <FormControl onChange={handleOnChange} type="text" placeholder="Search" className="col w-75" />

    <DropdownButton onSelect={handleSelectType} title={valueType} id="dropdown-item-button" className="col ml-1">
      <NavDropdown.Item eventKey='category'>category</NavDropdown.Item>
      <NavDropdown.Item eventKey="name">name</NavDropdown.Item>
    </DropdownButton>
    <DropdownButton onSelect={handlePriceType} title={priceType} id="basic-nav-dropdown" className="col ml-1">
      <NavDropdown.Item eventKey='highest'>highest</NavDropdown.Item>
      <NavDropdown.Item eventKey="lowest">lowest</NavDropdown.Item>
    </DropdownButton>
    <Button variant="outline-success" className="">Search</Button>
  </Navbar>
  <Products/>
  </div>

  );
}

export default App;
