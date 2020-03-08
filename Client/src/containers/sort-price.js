import React from 'react';
import {Component} from 'react';


export default class SortPrice extends Component {
    render () {
        return (
            <div className="input-group col-sm-4">
            <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">Sort by</label>
              </div>
                  <select className="custom-select" id="inputGroupSelect01">
                      <option defaultValue>Choose...</option>
                      <option value="1">Price: Low to High</option>
                      <option value="2">Price: High to Low</option>
                  </select>
          
                  </div>
                      
        )
    }
}