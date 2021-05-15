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
  useEffect(() => {
    const searchOptions = queryString.parse(location.search);
    debugger;
    dispatch(fetchProducts(searchOptions))
    dispatch(setCurrentPage(searchOptions))
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