import { useDispatch } from 'react-redux';
import { searchProducts } from '../actions';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const querySchema = Yup.object().shape({
  query: Yup.string().required()
});

const SearchBar = () => {

  const dispatch = useDispatch();

  const handleSearch = (query) => {
    dispatch(searchProducts(query));
    reset();
  }
  
  const { register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(querySchema)
  });
  
  return (
    <>
      <form onSubmit={handleSubmit(handleSearch)} >
        <div className='input-group'>  
          <input
            className='form-control' name='query' 
            {...register('query', {required:"required"})}></input>
          <span className='input-group-btn'>
            <button className="btn btn-primary search-btn" type="submit"> <strong> Search </strong> </button>
          </span>
        </div>
      </form>
    </>
  )
}

export default SearchBar;