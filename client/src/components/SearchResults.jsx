import { useSelector } from "react-redux";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const selectProducts = (state) => state.products;

const SearchResults = () => {
  const products = useSelector(selectProducts);

  if (!products) return <></>

  const productCards = products.map((product, i) => {
    return <ProductCard key={product._id} product={product} />
  });


  return (
    <div>
      <div className="row row-cols-md-3 g-3">
        {productCards}
      </div>
      <hr />
      <Pagination pageCount={9}/>  
    </div>
  );
};

export default SearchResults;
