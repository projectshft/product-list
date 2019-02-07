//display all parts of page
//include page numbers
//include dropdown "filter by category"
//include dropdown "sort by price"

import React from 'react';

// import ProductData from '../productData.json';
import ProductGrid from '../containers/productGrid';
import PageNumber from '../containers/pageNumber';



const App = () => {

   
    // pageRequest(page) {
    //     this.setState({ isLoading: true });

    //     const params = {
    //         page: page
    //     };

    //     axios.get(url, { params: params })
    //         .then(response => this.setState({
    //             products: response.data,
    //             isLoading: false
    //         }))

    //         .catch(error => this.setState({
    //             error,
    //             isLoading: false
    //         }))
    // }


    return (
        <div>
            <h1 >PRODUCTS</h1>
            <p>Welcome to our store!</p>

            <ProductGrid />
             {/* products={this.props.products}  */}
            
            {/* <PageNumber onPageSelect={this.pageRequest} /> */} 
           
        </div>
    )
}

export default App
