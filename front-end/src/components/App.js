import { useSelector, useDispatch } from "react-redux";
import { changePage, fetchProducts } from "../actions";
import { useEffect, useState } from "react";


function App() {
  // Both the product matrix and the pagination are rendered in this component
  const dispatch = useDispatch();
  const productData = useSelector(state => state.products);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    if (page !== undefined) {
      console.log('useEffect - Page is now: ', page)
    }
  }, [page, productData])

  const handlePageClick = (e) => {
    if (productData.productCount < 10) {
      setPage(1);
    }
    if(e.target.innerText === 'Previous') {
      const prevPage = page - 1;
      if (prevPage < 1) {
        console.log('already on first page');
        return null;
      }
      dispatch(changePage(prevPage, productData.categoryParam, productData.sortParam, productData.queryParam))
      setPage(prevPage);
    } else if (e.target.innerText === 'Next') {
      const nextPage = page + 1;
      //checks to see if the next page is greateer
      if (nextPage > Math.ceil(productData.productCount/9)) {
        console.log('already on last page');
        return null;
      }
      dispatch(changePage(nextPage, productData.categoryParam, productData.sortParam, productData.queryParam))
      setPage(nextPage);

    } else {
      //case for clicking on a page number
      dispatch(changePage(Number(e.target.innerText), productData.categoryParam, productData.sortParam, productData.queryParam))
      setPage(Number(e.target.innerText));
    }
  }

  let currentProducts = [];
  if(productData) {
    currentProducts = productData.products;
  }

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(productData.productCount / 9); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="container" id="products-container">
        <div className="row row-cols-1 row-cols-sm-3 g-3">
          {currentProducts.map((product, i) => {
            let name = product.name
            let category = product.category
            let price = product.price
            let image = product.image
            return (
              <div className="col" key={i}>
                <div className="card">
                  <img src={image} className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h3 className="card-title">{name}</h3>
                  <h5 className="card-title">Price: {price}</h5>
                    <p className="card-text">Category: {category}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" onClick={handlePageClick}href="#">Previous</a>
          </li>
          {pageNumbers.map((page, i) => {
            let pageNum = page;
            return(
            <li className="page-item" index={i}><a className="page-link" key={i} onClick={handlePageClick} href="#">{pageNum}</a></li>
            )
          })}
          <li className="page-item">
            <a className="page-link" onClick={handlePageClick} href="#">Next</a>
          </li>
        </ul>
      </nav>  
    </div>
  )
}

export default App;
