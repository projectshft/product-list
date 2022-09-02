import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const SearchResults = () => {
  return (
    <div>
      <div className="row row-cols-md-3 g-3">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <hr />
      <Pagination pageCount={9}/>  
    </div>
  );
};

export default SearchResults;
