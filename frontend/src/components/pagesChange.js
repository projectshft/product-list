import React from 'react';

const Pages = (props) => {
  return (
    <div>
      <nav aria-label="Page navigation">
        <ul className="pagination"
          page={props.page}
          onClick={event => {
            props.setPage(event.target.textContent)
          }}>
          <li className="page-item"><p className="page-link">1</p></li>
          <li className="page-item"><p className="page-link">2</p></li>
          <li className="page-item"><p className="page-link">3</p></li>
          <li className="page-item"><p className="page-link">4</p></li>
          <li className="page-item"><p className="page-link">5</p></li>
          <li className="page-item"><p className="page-link">6</p></li>
          <li className="page-item"><p className="page-link">7</p></li>
          <li className="page-item"><p className="page-link">8</p></li>
          <li className="page-item"><p className="page-link">9</p></li>
          <li className="page-item"><p className="page-link">10</p></li>
        </ul>
      </nav>
    </div>

  )
}

export default Pages;

