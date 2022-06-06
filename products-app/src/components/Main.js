import { changePage, changePageAndPrice, fetchProducts, sortProducts } from "../actions/index"
import { useDispatch, useSelector } from "react-redux";

function Main (props) {
  const pageNum = props.pageNum;
  const query = props.query;
  const price = props.price;
  
  const dispatch = useDispatch();
  let pages = [];

  const handleClick = (e) => {
    const num = parseInt(e.target.innerHTML);
    
    if(price !== ""){
      dispatch(changePageAndPrice(num, price));
      props.setPage(num)
    } else {
      dispatch(changePage(num));
      props.setPage(num);
    }
  };

  const handleRemoveQuery = () => {
    dispatch(sortProducts())
    props.setQuery("");
    props.setPages(10);
    props.setPage(1);
  };

  fetchProducts()
  const products = useSelector((state) => state.products);

  const loadQuery = () => {
    if(query !== ""){
      return (
        <div className="query-div">
          <p className="query">Products that match: {query}</p>
          <button onClick={handleRemoveQuery} className="btn-success">Remove</button>
        </div>
      )
    }
    if(query === ""){
      return <div></div>
    }
  }

  const loadProducts = () => {
    for(let i = 1; i < props.pagesNum + 1; i++){
      let loadingPage = parseInt(i);

      if(loadingPage === pageNum) {
        pages.push(<a type="button" href="#products" onClick={handleClick} className="col page current-page" key={i}>{i}</a>)
      } else {
        pages.push(<a type="button" href="#products" onClick={handleClick} className="col page" key={i}>{i}</a>)
      }
    }
    if(products[0][0]){
      return products[0].map((product) => {
        return (
          <div className="card product-div col-lg-3" key={product._id}>
            <br/>
            <p>Category: <strong>{product.category}</strong></p>
            <p className="price">${product.price}</p>
            <img className="product-image" src={product.image} alt="Product Here" />
            <br />
            <h3>{product.name}</h3>
          </div>
        )
      })
    } else {
      return (
        <p className="col no-results">No Results</p>
      )
    }
  }

  return (
    <div>
      <div className="container d-flex p-2">
        <div className="row text-center products">
          {loadQuery()}
          {loadProducts()}
        </div>
      </div>
      <br />
      <div className="container d-flex justify-content-center">
        <div className="row pages">
          {pages}
        </div>
      </div>
    </div>
  )
}

export default Main;