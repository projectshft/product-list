import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage, fetchProducts, setProducts } from "../reducer/slice";

const Pages = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.count);
  const stateProducts = useSelector(state => state.products);
  const activePage = useSelector(state => state.query.page)
  const pageCount = () => {
    let pages;
    if (count > 0) {
        if (count % 9 === 0){
          pages = ((count) / 9)
        }
        else {pages = (Math.ceil((count) / 9))}
      }
      return pages;
    }
  
  
    const handlePageClick = async (e) => {
      await dispatch(setPage(e.target.innerHTML))
      const products = await dispatch(fetchProducts());
      dispatch(setProducts(products.payload.products));
    }
  const printPages = () => {
    let pagesStyle = {
        borderStyle: 'solid',
        borderWidth: '1px',
        cursor: 'pointer',
    }

    let pageArray = []
    for (let i = 1; i <= pageCount(); i++) {
      if (i === parseInt(activePage)) {
        const altPageStyle = {
          borderStyle: 'solid',
          borderWidth: '1px',
          cursor: 'pointer',
          backgroundColor: 'gainsboro'
        }
        pageArray.push(<div key = {i} onClick = {handlePageClick} style = {altPageStyle}className = 'page col'>{i}</div>)}
    else {pageArray.push(<div key = {i} onClick = {handlePageClick} style = {pagesStyle}className = 'page col'>{i}</div>)
    }}
    return pageArray;}
  
    const pageTitle = () => {
      if (stateProducts.length > 0){
        return <strong className="mt-4 mb-2">Pages</strong>
        }
    }
      return (<div className = 'row'>{pageTitle()}{printPages()}</div>)
    
  }


export default Pages;