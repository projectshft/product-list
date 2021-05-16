import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router"
import { fetchProducts, setCurrentPage } from "../actions"
import PageSelector from "./PageSelector"
import ProductsList from "./ProductsList"
import SearchBar from "./SearchBar"
const queryString = require('query-string');

const MainProductsPage = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  //let history = useHistory();
  //const searchOptions = useSelector(({searchOptions}) => searchOptions)
  useEffect(() => {
    const searchOptions = queryString.parse(location.search);
    dispatch(fetchProducts(searchOptions))
    dispatch(setCurrentPage(searchOptions))
    //const newLocation = {...location, search: queryString.stringify(searchOptions, {skipEmptyString: true})}
    //history.push(newLocation)
  }, [location])
  
  return (
    <div className="container-fluid main">
      <SearchBar />
      <ProductsList />
      <PageSelector />
    </div>
  )
}

export default MainProductsPage;