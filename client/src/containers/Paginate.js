import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch, useSelector } from "react-redux"
import { pageChange } from "../features/queryInputSlice";


const Paginate = () => {
  const productData = useSelector((state) => state.productStore);
  const totalPages = productData.products.totalPages;
  const dispatch = useDispatch();


  const handleClick = (e) => {
    dispatch(pageChange(e.target.innerHTML));
    console.log(e.target.innerHTML)
  };

  
  let pageNumbers = [];
  for (let number = 1; number <= totalPages; number++) {
    pageNumbers.push(number);
  }
  
  return (
    <>
     <div style={{ display: 'block', width: 700, padding: 30 }}>
      <Pagination>
        {pageNumbers.map((number) => (<Pagination.Item className="page-item" onClick={handleClick} key={number} value={number}>{number}</Pagination.Item>))}
      </Pagination>
     </div>
    </>
  )
}

export default Paginate