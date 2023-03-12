import 'bootstrap/dist/css/bootstrap.css';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { nameSearch } from '../features/queryInputSlice';

const nameSearchSchema = yup.object({
  name: yup.string().max(40)
});

const NameSearch = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(nameSearchSchema)});

  const dispatch = useDispatch();

  const handleNameSearch = (data) => {
    dispatch(nameSearch(data.name));
  };

  return (<Form className="d-flex" onChange={handleSubmit(handleNameSearch)}>
            <Form.Control 
              className="input-group w-100"
              type="search" 
              placeholder="Enter Product Name Here"
              {...register("name")}
            />
            {errors.name?.message}
          </Form>
  )
};

export default NameSearch
