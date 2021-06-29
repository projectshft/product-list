import { FormControl, DropdownButton, Dropdown, InputGroup } from "react-bootstrap"
import './components-css.css'
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { getPage, getName, getCategory, getPriceType  } from "../actions/actions"


const FilterArea = () => {

  // name state
  const [name , setName] = useState('')
  //category state
  const [categoryValue, setCategoryValue] = useState('category')

  const dispatch = useDispatch()
  
  let productCategories

  // gets available categories from back end
  const categories = useSelector(state => state.products.categories)

  // maps through the categories to render them
  if(categories){
    productCategories = categories.map((category) => {
      return <Dropdown.Item eventKey={category}>{category}</Dropdown.Item>
    })
  }
  else{
    productCategories = <li>No categories to list</li>
  }

  // on change of name sets local state to the value
    const handleNameChange = (e) => {
      setName(e.target.value)
    }

    // on click of name search dispatches the action while setting page to 1
    const handleNameSubmit = () => {
      dispatch(getPage(1))
      dispatch(getName(name))
    }

    // on select of category sets page to one and dispatches category 
    const handleCategorySelect = (e) => {
      setCategoryValue(e)
      dispatch(getPage(1))
      dispatch(getCategory(e))
    }
    // handles the click of  all categories 
    const handleAllCategorySelect = (e) => {
      setCategoryValue('Category')
      dispatch(getCategory(''))
    }

    // handles the price type
    const handlePriceType = (e) => {
      dispatch(getPriceType(e))
    }


    return (
      <div className="container-fluid row mt-2">

        <InputGroup className="col-md">
          <FormControl
            type="text"
            placeholder="Search product name"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
            onChange={handleNameChange}
          />
          <InputGroup.Text onClick={handleNameSubmit} id="btnGroupAddon" className="search-icon">search</InputGroup.Text>
        </InputGroup>
      
        <DropdownButton onSelect={handleCategorySelect} id="dropdown-basic-button" title={`Sort By ${categoryValue}`} className="col-3 " variant="info">
          <p href="#" role="button" className="dropdown-item" onClick={handleAllCategorySelect}>All</p>
          <hr/>
          {productCategories}
        </DropdownButton>

        <DropdownButton onSelect={handlePriceType} id="dropdown-basic-button" title="Sort By Price" className="col-3" variant="info">
          <Dropdown.Item eventKey="highest">Highest</Dropdown.Item>
          <Dropdown.Item eventKey="lowest">Lowest</Dropdown.Item>
        </DropdownButton>

      </div>
    )
}

export default FilterArea