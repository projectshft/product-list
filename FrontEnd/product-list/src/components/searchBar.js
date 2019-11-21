import React, { Component } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

class SearchBar extends Component {
    render() {
        return (
            <div>
                <Form>
                    <InputGroup>
                        <input placeholder='Search Products'/>
                    </InputGroup>
                </Form>
            </div>
        )
    }
}

export default SearchBar