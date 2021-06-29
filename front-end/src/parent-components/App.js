import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductBody from '../child-components/render-products'
import { getProducts } from '../actions/actions'
import Paginate from '../child-components/pagination'
import FilterArea from '../child-components/filteration'

const App = () => {

  const dispatch = useDispatch()

  const filteredData = useSelector(state => state.filterData)
  
  //gets initial load and depends on change of filteration state
  useEffect(() => {
  dispatch(getProducts(filteredData.pageNumber, filteredData.name,filteredData.category, filteredData.priceType))
  }, 
    [filteredData.pageNumber,
    filteredData.name,
    filteredData.category,
    filteredData.priceType])

  return (
    <React.Fragment>
      <FilterArea />
      <ProductBody />
      <Paginate/>
    </React.Fragment>
  )
}

export default App