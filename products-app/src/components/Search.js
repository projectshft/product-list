import { useDispatch } from "react-redux"
import { sortProducts } from "../actions";
import CategoryDrop from "./Category-Drop"
import PriceDrop from "./Price-Drop"

function Search (props) {
  const dispatch = useDispatch();
  const category = props.category;
  const price = props.price;

  const handleSubmit = (e) => {
    const query = e.target[0].value

    if(query){
      if(category !== "" && price !== ""){
        dispatch(sortProducts(price, category, query));
        props.setQuery(query);
        props.setPages(1);
        props.setPage(1);
      } else if(category === "" && price !== "") {
        dispatch(sortProducts(price, undefined, query));
        props.setQuery(query);
        props.setPages(1);
        props.setPage(1);
      } else if(category !== "" && price === "") {
        dispatch(sortProducts(undefined, category, query));
        props.setQuery(query);
        props.setPages(1);
        props.setPage(1);
      } else if(category === "" && price === "") {
        dispatch(sortProducts(undefined, undefined, query));
        props.setQuery(query);
        props.setPages(1);
        props.setPage(1);
      }
  
      e.target[0].value = "";
    } else {
      alert("Please enter text before submitting form")
    }
    
  }

  return (
    <div id="search">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <form className="col" onSubmit={handleSubmit}>
              <div className="row">
                <input className="col-9 add-margin search-bar" placeholder="Search"></input>
                <button className="btn btn-success col" type="Submit">Submit</button>
              </div>
            </form>
            <div className="add-margin">
              <CategoryDrop setPages={props.setPages} setPage={props.setPage} setCat={props.setCat} category={props.category} price={props.price} setPrice={props.setPrice} query={props.query} />
            </div>
            <div className="add-margin">
              <PriceDrop setPages={props.setPages} setPage={props.setPage} setCat={props.setCat} category={props.category} price={props.price} setPrice={props.setPrice} query={props.query} />
            </div>
          </div>
        </nav>
    </div>
  )
}

export default Search