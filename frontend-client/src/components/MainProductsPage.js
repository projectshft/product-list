import PageSelector from "./PageSelector"
import ProductsList from "./ProductsList"
import SearchBar from "./SearchBar"

const MainProductsPage = () => {
  return (
    <div className="container-fluid">
      <SearchBar />
      <ProductsList />
      <PageSelector />
    </div>
  )
}

export default MainProductsPage;