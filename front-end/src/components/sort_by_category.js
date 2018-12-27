import React, { Fragment, Component } from "react";

class SortByCategory extends Component {
   render() {
      return (
         <Fragment>
            <option value="Tools">Tools</option>
            <option value="Home">Home</option>
            <option value="Electronics">Electronics</option>
         </Fragment>
      );
   }
}

export default SortByCategory;