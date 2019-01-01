import React from 'react';

const Pagination = ({changePage}) => {

  let page;

  const handleClick = () => {
    // changePage(page);
    console.log(page)
  }

  return (
    <div className='row' id="page-navigation">
        <div className="col-sm-1" onClick={handleClick}>1</div>
        <div className="col-sm-1" onClick={handleClick}>2</div>
        <div className="col-sm-1">3</div>
        <div className="col-sm-1" >4</div>
        <div className="col-sm-1" >5</div>
        <div className="col-sm-1" >6</div>
        <div className="col-sm-1" >7</div>
        <div className="col-sm-1" >8</div>
        <div className="col-sm-1" >9</div>
        <div className="col-sm-1" >10</div>
    </div>
  )
}

export default Pagination;