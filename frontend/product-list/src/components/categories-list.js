import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories, setCategory, fetchProducts } from '../actions';

const CategoriesList = () => {
  const categories = useSelector((state) => state.categories);
  // let products = useSelector((state) => state.products.products);
  // let page = useSelector((state) => state.products.pageSelected);
  // let sort = useSelector((state) => state.products.sortSelected);
  // let query = useSelector((state) => state.products.query);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [fetchCategories]);

  function renderCategories() {
    if (categories.length > 0) {
      return categories.map((category, i) => (
        <li  
          className="list-group-item" 
          key ={i}
          onClick={() => {
            dispatch(setCategory(category));
            // dispatch(fetchProducts(page, category, sort, query));
          }
        }>
          {category}
        </li>
      ));
    } 
  };


  return (
      <div>
      <div className="text-xs-right">
      </div>
      <br />
      <h3>Categories</h3>
      <ul className="list-group">{renderCategories()}</ul>    
    </div>
  )

};

export default CategoriesList;