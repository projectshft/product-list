import React, { Component } from "react";

class SearchBar extends Component {
    render() {

        return (
            <div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Pruduct Search" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" id="button-addon2">Search</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;