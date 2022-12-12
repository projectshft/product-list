import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar"
import Pagination from "../components/Pagination";
import { useLazyGetProductsQuery } from "../services/products";
import { useState } from "react";
import { buildURL } from "../helpers/buildURL";
import { useEffect } from "react";

const Home = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [trigger, {data, isLoading, error}] = useLazyGetProductsQuery();

  useEffect(() => {
    trigger(buildURL({sort: sort, search: search, category: category, page: currentPage}))
  }, [sort, search, category, currentPage])

  const onSearchChange = (e) => {
    setSearch(e.target.value)
  }
  const onSortChange = (e) => {
    setSort(e.target.value)
  }
  const onCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="flex flex-col mt-10 justify-center items-center w-screen">
      <SearchBar data={data} error={error} isLoading={isLoading} onCategoryChange={onCategoryChange} onSearchChange={onSearchChange}/>
      <div className="mt-11 flex justify-start container w-screen">
        <div className="">
          <SideBar onCategoryChange={onCategoryChange} onSortChange={onSortChange} category={category} sort={sort} />
        </div>
        <div>
          <div className="flex flex-wrap justify-center">
            <ProductCard data={data} error={error} isLoading={isLoading} />
          </div>
          <div className="flex justify-center" >
            <Pagination data={data} currentPage={currentPage} error={error} isLoading={isLoading} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
    </div>
  )
}


export default Home;