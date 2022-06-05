import { changePage, fetchProducts } from "../actions/index"
import { useDispatch, useSelector } from "react-redux";

function Main (props) {
  const pageNum = props.pageNum;
  
  const dispatch = useDispatch();
  let pages = [];

  const handleClick = (e) => {
    const num = parseInt(e.target.innerHTML);
    dispatch(changePage(num));
    props.setPage(num)
  }

  fetchProducts()
  const products = useSelector((state) => state.products);

  
  const loadProducts = () => {
    for(let i = 1; i < props.pagesNum + 1; i++){
      let loadingPage = parseInt(i);

      if(loadingPage === pageNum) {
        pages.push(<a type="button" href="#products" onClick={handleClick} className="col page current-page" key={i}>{i}</a>)
      } else {
        pages.push(<a type="button" href="#products" onClick={handleClick} className="col page" key={i}>{i}</a>)
      }
    }
    return products[0].map((product) => {
      return (
        <div className="card product-div col-lg-3" key={product._id}>
          <p>Category: <strong>{product.category}</strong></p>
          <p>${product.price}</p>
          <img src={product.image} alt="Product Here" />
          <h3>{product.name}</h3>
        </div>
      )
    })
  }

  return (
    <div>
      <div className="container d-flex p-2">
        <div className="row text-center products">
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