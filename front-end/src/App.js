
import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, NavDropdown, FormControl, Form, DropdownButton, Button} from 'react-bootstrap'
import Products from './productsComponents'

import { getProducts, GET_PRODUCTS} from './actions'
import { useDispatch, useSelector} from 'react-redux'
import isEmpty from 'lodash.isempty'




const  App = ()  =>{

 const dispatch =  useDispatch()

 const data = useSelector(state => state.products)

 // state to control data on page
  const [valueType,setValueType]=useState('name');
  const [priceType,setPriceType] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

// on load renders the default page number with ascending price
 useEffect(() => {
  dispatch(getProducts(pageNumber, name, category, priceType))
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[getProducts])

// renders product display if they are not empty
const renderProducts = () => {
  if(!isEmpty(data)){
   return (
     <div>
       <Products />
     </div>
   )
  }
}

// onClick sets the state for next page then kicks off another request for that page data
const renderNextPage = (e) => {
  e.preventDefault()
  setPageNumber(prevState => prevState + 1)
  dispatch(getProducts(pageNumber, name, category, priceType))
}

// onClick sets the state for previouse page then kicks off another request for that page data
const renderPrevPage = (e) => {
  e.preventDefault()
  if(pageNumber < 0){
    setPageNumber(prevState => prevState + 1)
  }
  else {
    setPageNumber(prevState => prevState - 1)
    dispatch(getProducts(pageNumber, name, category, priceType))
  }
 
}

// onClick of search kicks off a request with  the updated state
const HandleOnSearch = (e) => {
  e.preventDefault()

  dispatch(getProducts(pageNumber, name, category, priceType))
}


// for ui and updates the state for either category or name based on selection
  const handleSelectType=(e)=>{
    setValueType(e)
  }

  // onSelect sets the state to either 1 for ascending or -1 for descending
  const handlePriceType = (e) => {
    if(e == 'highest'){
      setPriceType(1)
      
    }
    else if (e == 'lowest'){
      setPriceType(-1)
    }
  }
//onSelect sets the state to either name or category to filter search 
// search does not have to have exact words it can be anything by utilizing backend aggregation
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
    <Button onClick={HandleOnSearch} variant="outline-success" className="">Search</Button>
  </Navbar>
    <div className="row">
      <button  onClick={renderPrevPage} type="button" className="btn btn-link col">&lt;&lt; prevPage</button>
      <button  onClick={renderNextPage} type="button" className="btn btn-link col">nextPage&gt;&gt;</button>
    </div>
  {renderProducts()}
  </div>

  );
}

export default App;
