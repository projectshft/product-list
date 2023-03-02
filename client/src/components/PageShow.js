import React from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { updatePage } from '../features/product/productsSlice';

const PageShow = () => {
const dispatch = useDispatch();
     
const handleClick = (e) => {
  dispatch(updatePage(e.target.value))
}; 

  return (
    <div>
      <Button variant="warning" type="submit" value="1" onClick={handleClick}>1</Button>{''}
      <Button variant="warning" type="submit" value="2" onClick={handleClick}>2</Button>{''}
      <Button variant="warning" type="submit" value="3" onClick={handleClick}>3</Button>{''}
      <Button variant="warning" type="submit" value="4" onClick={handleClick}>4</Button>{''}
      <Button variant="warning" type="submit" value="5" onClick={handleClick}>5</Button>{''}
      <Button variant="warning" type="submit" value="6" onClick={handleClick}>6</Button>{''}
      <Button variant="warning" type="submit" value="7" onClick={handleClick}>7</Button>{''}
      <Button variant="warning" type="submit" value="8" onClick={handleClick}>8</Button>{''}
      <Button variant="warning" type="submit" value="9" onClick={handleClick}>9</Button>{''}
      <Button variant="warning" type="submit" value="10" onClick={handleClick}>10</Button>{''}
    </div>  
  )
};

export default PageShow;