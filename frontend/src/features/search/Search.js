//need to figure out how to change the pagenumber state when backend kicks it to page one
import { useState } from "react";
import { useGetProductsQuery } from "../api/apiSlice";
import CardExcerpt from "./CardExcerpt"
import NumberBarExcerpt from "./NumberBarExcerpt"
import SearchBarExcerpt from "./SearchBarExcerpt"

//function component that renders the searchbar
const Search = () => {
  
  //local states for search bar
  const [ inputState, setInput ] = useState("")
  const [ categoryState, setCategory ] = useState("");
  const [ priceState, setPrice ] = useState("");
  const [ pageNumberState, setPageNumber ] = useState(1)
  
  //destructure data from Product Query
  const {
    data: queryData,
    isLoading,
    isSuccess,
    isError,
    error
  }  = useGetProductsQuery( inputState+ categoryState + priceState + "&page=" + pageNumberState );
  
  //if statement that will return component depending on query status
  let content;
  let numberBar;
  let loadedData;
  let currentPage;
  if(isLoading) {
    content = <p>Loading...</p>
  } 
  else if (isSuccess) {
    loadedData = queryData;
    
    //changes local state to 1 if queried page number in RTK Query is too high to
    //render cards since page number not available for loaded products. 
    //This will cause a re-render with query page of 1.
    if(queryData.pages < pageNumberState && queryData.pages !== 0){setPageNumber(1)};

    //returns Cards to display by mapping products
    content =  queryData.product.map( element => {
      return(<CardExcerpt key={element.name} element={element}/>)
    });

    //Current page component
    currentPage = <div>{queryData.product.length === 0 ? "Nothing to Display" : "Current Page:" + pageNumberState}</div>
    
    //creates an array for mapping over
    let numberOfPagesArray = Array.from({length: queryData.pages}, (_, i) => i + 1);

    //map over array to create the numbers in the numberbar
    numberBar = numberOfPagesArray.map((number, i) => {
      return(<NumberBarExcerpt key={"n"+i} number={number} setPageNumber = {setPageNumber}/>)
    })
  } 
  else if (isError) {
    content = <p>{error}</p>
  }
  
  return (
    <div id="SearchContainer" className="container">
      <div id="SearchBarRow" className="row">
        <SearchBarExcerpt setInput={setInput} setCategory={setCategory} setPrice={setPrice}/>
      </div>
      <div className="row row-cols-3 gy-5 offset-1">
        {content}
      </div>  
      <div className="row ">
        <hr className="gy-5"/>
        <div>{currentPage}</div>
        <div className="d-flex justify-content-center">
          <div className="btn-toolbar mx-auto" role="toolbar">
            <div className="btn-group" role="group" aria-label="First group">
              {numberBar} 
            </div>
          </div>
        </div>
        <hr className="gy-5"/>
      </div>
    </div>
  );
}

export default Search;
