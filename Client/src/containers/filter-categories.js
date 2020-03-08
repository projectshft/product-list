import React from 'react';
import {Component} from 'react';


export default class FilterCategories extends Component {
    render () {
        return (
           
<div className="input-group col-sm-4">
  <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">Filter by Categories</label>
    </div>
        <select className="custom-select" id="inputGroupSelect01">
            <option defaultValue>Choose...</option>
            <option value="1">Games</option>
            <option value="2">Toys</option>
            <option value="3">Home</option>
            <option value="4">Jewelery</option>
            <option value="5">Garden</option>
            <option value="6">Grocery</option>
            <option value="7">Kids</option>
            <option value="8">Movies</option>
            <option value="9">Sports</option>
        </select>

        </div>
            
        )
    }
}