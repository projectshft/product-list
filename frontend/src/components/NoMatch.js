import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => {
  return (
    <div>
      <h4>
      Whoops!
      </h4>
    <Link to='/' ><h4>Back to the start</h4></Link>


    </div>
  )
}

export default NoMatch