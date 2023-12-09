import { useState } from "react";
import SearchResultsItem from "./SearchResultsItem";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Product } from "../../types/types.ts";

function SearchResults() {
  const [page, setPage] = useState(0);

  const fetchProducts = async (page = 0) => {
    const res = await fetch(`http://localhost:8000/products?page=${page}`); 
    const data = await res.json();
    return data.responseMessage;
  };

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["products", page],
      queryFn: () => fetchProducts(page),
      placeholderData: keepPreviousData,
    });

  return (
    <div className="columns-1 sm:columns-3 mx-auto mt-8">
      { isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.map((product: Product) => {
            return <SearchResultsItem key={product._id} product={product} />
          })}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
