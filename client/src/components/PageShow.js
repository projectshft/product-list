import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';


const PageShow = () => {

 const [pageQuery, setPageQuery] = useState('')
    
  const handleClick = (e) => {
    (setPageQuery(e))
   
  }; 

  console.log({pageQuery})

  

    return (
      <div>
            
      <Button variant="warning" type="submit" value="1" onClick={(e) => {handleClick(e.target.value)}}>1</Button>{''}
      <Button variant="warning" type="submit" value="2" onClick={(e) => {handleClick(e.target.value)}}>2</Button>{''}
      <Button variant="warning" type="submit" value="3" onClick={(e) => {handleClick(e.target.value)}}>3</Button>{''}
      <Button variant="warning" type="submit" value="4" onClick={(e) => {handleClick(e.target.value)}}>4</Button>{''}
      <Button variant="warning" type="submit" value="5" onClick={(e) => {handleClick(e.target.value)}}>5</Button>{''}
      <Button variant="warning" type="submit" value="6" onClick={(e) => {handleClick(e.target.value)}}>6</Button>{''}
      <Button variant="warning" type="submit" value="7" onClick={(e) => {handleClick(e.target.value)}}>7</Button>{''}
      <Button variant="warning" type="submit" value="8" onClick={(e) => {handleClick(e.target.value)}}>8</Button>{''}
      <Button variant="warning" type="submit" value="9" onClick={(e) => {handleClick(e.target.value)}}>9</Button>{''}
     
      <br />
    </div>
    )
  }

export default PageShow;

