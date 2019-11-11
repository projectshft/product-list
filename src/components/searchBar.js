import React, { Component } from "react";
import { Button } from 'react-bootstrap';

class SearchBar extends Component {
    render() {

        return (
            <div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Product Search" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <div className="input-group-append">
                        <Button className="btn btn-primary" type="button" id="button-addon2">Search</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;