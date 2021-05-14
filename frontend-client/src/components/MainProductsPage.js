import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchInitialProducts } from "../actions"
import PageSelector from "./PageSelector"
import ProductsList from "./ProductsList"
import SearchBar from "./SearchBar"

const MainProductsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitialProducts())
  }, [])
  
  return (
    <div className="container-fluid main">
      <SearchBar />
      <ProductsList />
      <PageSelector />
    </div>
  )
}

export default MainProductsPage;