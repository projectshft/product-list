import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions/index";
import _ from "lodash";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';

class Products extends Component {  
    constructor(props) {
        super(props);
    
        this.state = { 
          currentPage: 1,
          itemsOnPage: 9
        };  

        this.onChangePageClick = this.onChangePageClick.bind(this);
    }
  

  componentDidMount() {
    this.props.fetchProducts()
  }

	renderList() {
    if(this.props.products === undefined){
            return <div>Loading...</div>; 
    }

		return _.map(this.props.products, currentProduct => {
			return (
                <Col key={currentProduct._id} className="col-md-4" style={{margin: "0px", padding: "15px"}}>
                    <Row className="collection-header" style={{position: "relative", verticalAlign: "top", alignItems: "baseline"}}>
                      <div style={{align: "left"}}>
                        <h6>Category: {currentProduct.category}</h6>
                      </div>
                        <h4>${currentProduct.price}</h4>
                    </Row>
                    <img src="https://www.oysterdiving.com/wp-content/uploads/Deep-sea-diving.jpg" style={{width: "75%", height: "75%"}} />
                    <h4>{currentProduct.name}</h4>
                </Col>
			);
	    }); 
    }

    async onChangePageClick(event) {
      await this.setState({ currentPage: event.target.value });
      this.props.fetchProducts(`?page=${this.state.currentPage}`)
    }

    paginationNumbers = () =>{
        const { count } = this.props;
        const { itemsOnPage } = this.state;
    
        const pagesToNumbers = [];
        for (let i = 1; i <= Math.ceil(count / itemsOnPage); i++) {
          pagesToNumbers.push(i);
        } 
    
        const numbers = pagesToNumbers.map(number => {
          return (
              <li className="page-link"
                key={number} 
                id={number} 
                value={number}
                onClick={this.onChangePageClick}>
                {number}
                </li>
          );
        });
    
        return numbers;
    }

    render() {
        return (
          <Container>
            <Row>
                {this.renderList()}
            </Row>
            <Row style={{justifyContent: "center"}}>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        { this.paginationNumbers() }
                    </ul>
                </nav>
            </Row>
          </Container>
        );
    }
}

function mapStateToProps( products ) {
  return{
    products: products.products.products,
    count: products.products.count
  } 
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Products);