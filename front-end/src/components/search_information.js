import React, { Component } from "react";

class SearchInformation extends Component {
   render() {
      return (
         <div className="container">
            <p>Searching for: <strong>Bacon</strong> in <strong>Tools</strong></p>
            <p>Total number of items: <strong>90</strong></p>
            <p>Viewing page: <strong>1</strong> of <strong>9</strong></p>
         </div>
      );
   }
}

export default SearchInformation;