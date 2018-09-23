import React, { Component } from "react";

class DropDown extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div class="dropdown">
                <button onclick="myFunction()" class="dropbtn">Dropdown</button>
                    <div id="myDropdown" class="dropdown-content">
                        <a href="#">Product 1</a>
                        <a href="#">Product 2</a>
                        <a href="#">Product 3</a>
                    </div>
            </div>
        )
    }
}

export default DropDown;