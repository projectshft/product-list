import 'bootstrap/dist/css/bootstrap.css';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { keywordSearch } from '../features/queryInputSlice';

const keywordSearchSchema = yup.object({
  keyword: yup.string().required('You must provide a keyword').max(20)
});

const KeywordSearch = (props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({resolver: yupResolver(keywordSearchSchema)});
  const dispatch = useDispatch();
  

  const handleKeywordSubmit = (data) => {
    dispatch(keywordSearch(data.keyword));
    reset();
  }

  return (<Form className="d-flex" onSubmit={handleSubmit(handleKeywordSubmit)}>
          <Form.Control 
            className="input-group me-2"
            type="search" 
            placeholder="Keyword Search"
            {...register("keyword")}
          />
          {errors.keyword?.message}
          <div></div>
          <Button variant="light" type="submit">Search</Button>
        </Form>
  )
};
export default KeywordSearch