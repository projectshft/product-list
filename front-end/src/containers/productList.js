import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';
import ReactPaginate from 'react-paginate';

// This class handles rendering the filters along with the list of products

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    
  }



const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchProducts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

/*
https://images.unsplash.com/photo-1514218953589-2d7d37efd2dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80
https://images.unsplash.com/photo-1526887520775-4b14b8aed897?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80
https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=627&q=80
https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
https://images.unsplash.com/photo-1513116476489-7635e79feb27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1284&q=80
https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
https://images.unsplash.com/photo-1530914547840-346c183410de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
*/

// import React, { Component } from 'react';
// import { connect } from 'react-redux';


// class NaturalMakeUpList extends Component {

//  renderNaturalMakeUp (makeUpData) {
//    let newMakeUpData = Object.values(makeUpData);
//    // Filter the data to check for products that are natural and not vegan
//    let natural = makeUpData.filter(m => m.tag_list.includes("Natural")&& !m.tag_list.includes("Vegan"))
//  console.log("natural", natural)
//      return (

//                 natural.map(m => ( 
//                     <div className="col-3 makeup-item text-center" key={m.id}>
//                       <img src={m.image_link} alt="" width="140" height="auto" className="rounded mx-auto d-block"></img>
//                       <div className="item-name">{m.name}</div>
//                       <div className="item-brand">{m.brand}</div>
//                       <div className="price">${parseFloat(m.price).toFixed(2)}</div>
//                       <button type="button" class="btn btn-outline-info"><a href={m.product_link} className="text-info">Buy it Now</a></button>
//                       </div>

//                 ))



//         )
//       }

// render() {
//     return (
//       <div id="main-view" className="container">
//       <h1 id="natural" className="text-left">Natural Products</h1>
//         <hr></hr>
//         <div className="row d-flex ">



//           {this.props.makeUp.map(this.renderNaturalMakeUp)}


//         </div>
//         </div>

//     );
//   }
// }

// function mapStateToProps({ makeUp }) {
//   console.log('makeup', {makeUp})
//   return { makeUp };
// }

// export default connect(mapStateToProps)(NaturalMakeUpList);
