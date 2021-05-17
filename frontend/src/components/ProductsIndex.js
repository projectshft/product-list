import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import './style.css';
import { fetchProducts } from "../actions";
import SearchQuery from "./searchByName.js";
import FilterQuery from "./filterByCategory";
import SortQuery from "./sortByPrice"
import Products from "./products";
import Pages from "./pagesChange"

const ProductsIndex = () => {
  const products = useSelector((state) => state.products);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [value, setValue] = useState('');
  const [page, setPage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProducts]);

  useEffect(() => {
    dispatch(fetchProducts(page, query, sortBy, value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    dispatch(fetchProducts(page, query, sortBy, value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    dispatch(fetchProducts(page, query, sortBy, value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  useEffect(() => {
    dispatch(fetchProducts(page, query, sortBy, value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div>
      <SearchQuery value={value} setValue={setValue} />

      <div className="filters">
        <h5 className="categoryFilterResults"><strong>Filter by Category:</strong></h5>
        <FilterQuery query={query} setQuery={setQuery} className="col-md-4" />
        <h5 className="priceSortResults"><strong>Sort by Price:</strong></h5>
        <SortQuery sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <div>
        <div className="main-layout">
          <Products products={products} /></div>
      </div>
      <div className="pages">
        <Pages page={page} setPage={setPage} />
      </div>
    </div >
  );
}

export default ProductsIndex;