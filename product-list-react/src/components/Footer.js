import { useSelector, useDispatch } from "react-redux";
import { paginate } from "../reducers/productsSlice";

const Footer = () => {
  const dispatch = useDispatch();

  const params = useSelector(state => state.products.params)
  const pageQuery = useSelector(state => state.products.pageNum);
  const numOfDocs = useSelector(state => state.products.numOfDocs);
  const numOfPages = numOfDocs / 9 - (pageQuery - 1);

  const renderFooter = () => {

    const clickPage = (e) => {
      const pageClicked = e.target.innerHTML;
      dispatch(paginate(pageClicked));
    }

    let footer = [];

    if (numOfPages < 1) {
      footer.push(<li key="1" className="page-item"><button className="page-link">1</button></li>)
    }
    else {
      for (let i = 1; i <= numOfPages; i++) {
        footer.push(
  
              <li key={i} className="page-item"><button className="page-link" onClick={clickPage}>{i}</button></li>
    
        )
      };
    }
    return footer;
    }
    

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">{renderFooter()}</ul></nav>
  )
}

export default Footer