import { useDispatch, useSelector } from 'react-redux';
import {search} from '../actions/index'
import Button from './Button';


function Pagination() {
  const dispatch = useDispatch();
  const currentQuery = useSelector(state => state.currentQuery)
  const pagesToRender = [];
  const numPages = currentQuery.count/9
  for (let i = 1; i < numPages+1; i++) {
    pagesToRender.push(i);
    }
  
  const changePage = (page) => {
    dispatch(search(page, currentQuery.category, currentQuery.queryString, currentQuery.priceSort))
  }
  
  
  return (
    <>
    <div className = 'row'>
      <div className = 'col-sm-6 offset-md-3'>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            {pagesToRender.map(page=> {
              return (
                <>
                  <Button changePage={changePage} page ={page}/>
                </>
              )
            })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Pagination;
