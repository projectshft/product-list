//display all parts of page
//include page numbers
//include dropdown "filter by category"
//include dropdown "sort by price"

import React from 'react';

// import ProductData from '../productData.json';
import ProductGrid from '../containers/productGrid';
import PageNumber from '../containers/pageNumber';



const App = () => {

    return (
        <div>
            <h1 >PRODUCTS</h1>
            <p>Welcome to our store!</p>

            <ProductGrid />
            <PageNumber />
           
        </div>
    )
}

export default App
