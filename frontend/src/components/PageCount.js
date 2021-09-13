import { useSelector, useDispatch } from 'react-redux';
import { getProductsAsync } from "../redux/productSlice";

export default function PageCount () {
  const count = useSelector((state) => state.products[0].count);
  const numPages = Math.ceil(count/9 + 1);
  const params = {};
  const dispatch = useDispatch();
  let links = []
  const buildLinks = () => {
    for (let i = 1; i < numPages; i++) {      
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        links.push(<a value={i} href="#" key={i} className="page" onClick={handleClick}>{i}</a>)
    }
  }
  const handleClick = (e) => {
    params.page = parseInt(e.target.text);
    dispatch(getProductsAsync(params))
  }
  return (
    <div>
      <h4>Search Results: </h4>
      {buildLinks()}
      {links}
    </div>
  )
}