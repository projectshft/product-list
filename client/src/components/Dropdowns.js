import React from 'react'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Dropdown = () => {

  const [ open, setOpen ] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }

  return (
    <div>
      <button onClick={handleOpen}>{ExpandMoreIcon}</button>
      { open ?
        <div> 
          <p>Garden</p>
          <p>Movies</p>
          <p>Home</p>
          <p>Industrial</p>
        </div>        
          :
        <div>Closed</div>
        }   
      </div> 
    ) 
  } 

export default Dropdown