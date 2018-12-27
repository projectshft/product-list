import React, { Component } from "react";

class Pagination extends Component {
   render() {
      return (
         <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
               <li className="page-item"><a className="page-link" tabIndex='0'>1</a></li>
               <li className="page-item"><a className="page-link" tabIndex='0'>2</a></li>
               <li className="page-item"><a className="page-link" tabIndex='0'>3</a></li>
            </ul>
       </nav>
      );
   }
}

export default Pagination;