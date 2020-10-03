import React, { Component } from 'react';


class App extends Component {
    constructor () {
        super()

        this.state = {
            products: []
        }
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="page-header">
                        <h1>PRODUCTS</h1>
                    </div>

                    <div className="products">

                    </div>
                    
                </div>
            </div>
        )
    }
}