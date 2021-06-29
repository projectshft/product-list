import { FormControl, DropdownButton, Dropdown, InputGroup } from "react-bootstrap"
import './components-css.css'
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { getPage, getName, getCategory, getPriceType  } from "../actions/actions"


const FilterArea = () => {

  const [name , setName] = useState('')
  const [category, setCategory] = useState('')
  const [categoryValue, setCategoryValue] = useState('')

  const dispatch = useDispatch()

  let productCategory;

  const categories = useSelector(state => state.products.categories)

  if(categories){
    productCategory = categories.map((category) => {
      return <Dropdown.Item eventKey={category}>{category}</Dropdown.Item>
  })
  }
  else {
    productCategory = <Dropdown.Item >No categories to</Dropdown.Item>
  }


    const handleNameChange = (e) => {
      setName(e.target.value)
    }

    const handleNameSubmit = () => {
      setCategory('Category')
      dispatch(getPage(1))
      dispatch(getName(name))
    }

    const handleCategorySelect = (e) => {
      setCategoryValue(e)
      dispatch(getPage(1))
      dispatch(getCategory(e))
    }
    const handleAllCategorySelect = (e) => {
      setCategoryValue('Category')
      dispatch(getCategory(''))
    }

    const handlePriceType = (e) => {
      dispatch(getPriceType(e))
    }


    return (
      <div className="container-fluid row mt-2">

          <InputGroup className="col">
            <FormControl
              type="text"
              placeholder="Search product name"
              aria-label="Input group example"
              aria-describedby="btnGroupAddon"
              onChange={handleNameChange}
            />
            <InputGroup.Text onClick={handleNameSubmit} id="btnGroupAddon" className="search-icon">search</InputGroup.Text>
          </InputGroup>
      

        <DropdownButton onSelect={handleCategorySelect} id="dropdown-basic-button" title={`Sort By ${categoryValue}`} className="col">
          <p role="button" className="dropdown-item" onClick={handleAllCategorySelect}>All</p>
          {productCategory}
        </DropdownButton>


        <DropdownButton onSelect={handlePriceType} id="dropdown-basic-button" title="Sort By Price" className="col">
          <Dropdown.Item eventKey="highest">Highest</Dropdown.Item>
          <Dropdown.Item eventKey="lowest">Lowest</Dropdown.Item>
        </DropdownButton>

      </div>
    )
}

export default FilterArea