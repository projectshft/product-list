import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './actions';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function App () {
  const products = useSelector((state) => state.name);
  console.log(state);
  const dispatch = useDispatch();

  const renderProducts = () => {
    return (
      <table className='products-table'>
        <tr>Products</tr>
      </table>
    )

  }

  return (
    <div className='products'>
      <table className='search-table'>
        <thead>
          <tr>
            <th>Search</th>
            <th>Category</th>
            <th>Sort</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Search Form</td>
            <td>Category Drop-down</td>
            <td>Sort Options</td>
          </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>
      <p>{renderProducts()}</p>
    </div>
  )

}


export default App;