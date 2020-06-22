// import React from 'react';
// import { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown'
// import { connect } from 'react-redux';


// class DropDown extends Component {
//     constructor(props) {
//         super(props);

//         this.handleSelect = this.handleSelect.bind(this);
//     }

//    //when category is selected in drop down menu, categorySort is called
//    handleSelect(event){
//     console.log(this.props)
//     // const category = event[0].toUpperCase() + event.slice(1)//uppercase first letter for api call
//     // this.props.categorySort(category);
//     // console.log(category)
//   }

//     render() {
//     return (
//         <div>
//         <div className="App container">
  
//           <DropdownButton
//           alignRight
//           title="Dropdown right"
//           id="dropdown-menu-align-right"
//           onSelect={this.handleSelect}
//             >
//                   <Dropdown.Item eventKey="Automotive">Automotive</Dropdown.Item>
//                   <Dropdown.Item eventKey="Baby">Baby</Dropdown.Item>
//                   <Dropdown.Item eventKey="Beauty">Beauty</Dropdown.Item>
//                   <Dropdown.Item eventKey="Books">Books</Dropdown.Item>
//                   <Dropdown.Item eventKey="Clothing">Clothing</Dropdown.Item>
//                   <Dropdown.Item eventKey="Computers">Computers</Dropdown.Item>
//                   <Dropdown.Item eventKey="Electronics">Electronics</Dropdown.Item>
//                   <Dropdown.Item eventKey="Games">Games</Dropdown.Item>
//                   <Dropdown.Item eventKey="Garden">Garden</Dropdown.Item>
//                   <Dropdown.Item eventKey="Grocery">Grocery</Dropdown.Item>
//                   <Dropdown.Item eventKey="Home">Home</Dropdown.Item>
//                   <Dropdown.Item eventKey="Industrial">Industrial</Dropdown.Item>
//                   <Dropdown.Item eventKey="Jewelry">Jewelry</Dropdown.Item>
//                   <Dropdown.Item eventKey="Movies">Movies</Dropdown.Item>
//                   <Dropdown.Item eventKey="Music">Music</Dropdown.Item>
//                   <Dropdown.Item eventKey="Outdoors">Outdoors</Dropdown.Item>
//                   <Dropdown.Item eventKey="Shoes">Shoes</Dropdown.Item>
//                   <Dropdown.Item eventKey="Sports">Sports</Dropdown.Item>
//                   <Dropdown.Item eventKey="Tools">Tools</Dropdown.Item>
//                   <Dropdown.Item eventKey="Toys">Toys</Dropdown.Item>
//           </DropdownButton>
          
//         </div>
//       </div>
//     );
//   }
// }   

// function mapStateToProps(state) {

//     return { products: state.products }
// }

// export default connect(mapStateToProps)(DropDown);