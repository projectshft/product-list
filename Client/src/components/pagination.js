// import React from 'react';
// import {Component} from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchProducts } from '../actions/index';

// class Pagination extends Component {
    
//   constructor(props) {
//         super(props);
    
//         this.state = { currentPage: 'page=1'}

//         this.handleClick = this.handleClick.bind(this)
//     }

//     // componentDidMount () {
//     //   this.props.fetchProducts (this.state.currentPage)
//     // }


  
//     handleClick(event) {
    
  
//       this.setState({ currentPage:  "page=" + event.target.value})
//       let currentPage = this.state.currentPage
//       this.props.fetchProducts(currentPage);
      
//       console.log(event.target.value);
      
//       console.log(currentPage)
//     }



//     renderPages() {

        
//         let pageNumbers = [];
//         let count = this.props.products.count 
//         console.log(count)
        
//         for (let i = 1; i <= Math.ceil((count/9)) ; i++) {
//           pageNumbers.push(i)
//            }

//            const numbersList = pageNumbers.map(number => {
//             return (
//                 <li className="page-link"
//                   key={number} 
//                   value={number} 
//                   onClick={this.handleClick}>
//                   {number}
//                   </li>
//             );
//           });
      
//           return numbersList;
//         }
    
//         render() {
//             return (
//               <div className='pages'>
//                 {this.renderPages()}
//               </div>
//             )
//           }
    
// }
    
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ fetchProducts }, dispatch);
//   }
  
//   function mapStateToProps({products}) {
//   return { products};
//   }
  
//   export default connect(mapStateToProps, mapDispatchToProps)(Pagination);