import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Patrick's Product List</h1>
    
      <button className='btn'>
          <Link to='/products/new'>Add Contact</Link></button>
          <br></br>
      <button className='btn'>
          <Link to='/products/'>View List of Products</Link></button>
          <br></br>
          </div>
        
   
)

export default Home

