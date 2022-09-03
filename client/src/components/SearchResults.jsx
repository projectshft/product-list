import { useSelector } from "react-redux";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const selectProducts = (state) => state.products;
const selectCount = (state) => state.count;

const SearchResults = ({ state }) => {
  const products = useSelector(selectProducts);
  const count = Math.ceil(useSelector(selectCount) / 9);

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
      <Pagination state={state} pageCount={count}/>  
    </div>
  );
};

export default SearchResults;
