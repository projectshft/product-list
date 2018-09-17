import React, { Component } from "react";

class DropDown extends Component {
    constructor(props) {
        super(props);

        // this.state = { term: "" };
    }
    render() {
        return (
            <div class="dropdown">
                <button onclick="myFunction()" class="dropbtn">Dropdown</button>
                    <div id="myDropdown" class="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
            </div>
        )
    }
}

export default DropDown;