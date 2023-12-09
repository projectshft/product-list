import { useState } from "react";
import SearchResultsItem from "./SearchResultsItem";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Product } from "../../types/types.ts";

function SearchResults(props: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalResults: number;
  setTotalResults: React.Dispatch<React.SetStateAction<number>>;
}) {
  const page = props.page;

  const fetchProducts = async (page = 0) => {
    const res = await fetch(`http://localhost:8000/products?page=${page}`);
    const data = await res.json();
    props.setTotalResults(data.resultsFound);
    return data;
  };

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["responseMessage", page],
      queryFn: () => fetchProducts(page),
      placeholderData: keepPreviousData,
    });

  return (
    <div className="columns-1 sm:columns-3 mx-auto mt-8 pb-20">
      {isPending ? (
        <div className="ms-4">Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          {data.responseMessage.map((product: Product) => {
            return <SearchResultsItem key={product._id} product={product} />;
          })}
        </>
      )}
    </div>
  );
}

export default SearchResults;
