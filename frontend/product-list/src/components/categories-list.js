import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories, setCategory } from '../actions';
import {Button} from 'react-bootstrap';

const CategoriesList = () => {
  const categories = useSelector((state) => state.categories);
  categories.unshift("All Products");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [fetchCategories]);

  function renderCategories() {
    if (categories.length > 0) {
      return categories.map((category, i) => (          
          <Button
            variant="outline-secondary"  
            key ={i}
            onClick={() => {
              dispatch(setCategory(category));
            }
            }
          >
          {category}
          </Button>
      ));
    } 
  };


  return (
      <div>
      <div className="text-xs-right">
      </div>
      <br />
      <h6 className="text-center">Shop by Department</h6>
      <ul className="list-group">{renderCategories()}</ul>    
    </div>
  )

};

export default CategoriesList;