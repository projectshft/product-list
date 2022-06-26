import { useSelector, useDispatch } from "react-redux";
import { paginate } from "../reducers/productsSlice";

const Footer = () => {
  const dispatch = useDispatch();

  const params = useSelector(state => state.products.params);
  const numOfDocs = useSelector(state => state.products.numOfDocs);
  const numOfPages = numOfDocs / 9;

  const renderFooter = () => {

    const clickPage = (e) => {
      const pageClicked = e.target.innerHTML;
      const paramsObj = {
        category: params.category || "",
        query: params.query || "",
        sort: params.sort || "",
        pageClicked: pageClicked
      }
      dispatch(paginate(paramsObj));
    };

    let footer = [];

    if (numOfDocs <= 9) {
      footer.push(<li key="0" className="page-item"><button className="page-link" onClick={clickPage}>1</button></li>)
    }

    if (numOfPages < 2 && numOfDocs > 9) {
      footer.push(<li key="1" className="page-item"><button className="page-link" onClick={clickPage}>1</button></li>
      )
      footer.push(<li key="-1" className="page-item"><button className="page-link" onClick={clickPage}>2</button></li>
      )
    }
    
    if (numOfPages > 2 && numOfDocs > 9) {
      for (let i = 1; i <= numOfPages; i++) {
      footer.push(
        <li key={i} className="page-item"><button className="page-link" onClick={clickPage}>{i}</button></li>
        );
      };
    }

    if (numOfDocs === 0) {
      footer = []
    }
    return footer;
    }
    

  return (
    <nav aria-label="pagination footer" className="footer-nav">
      <ul className="pagination">{renderFooter()}</ul>
    </nav>
  )
}

export default Footer;