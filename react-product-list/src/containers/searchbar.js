import React from 'react';
import { Component } from 'react';




export default class SearchBar extends Component {
    render() {
      return (
        <div className='col'>
          <form>
            <input placeholder="Search"></input>
            <button className='search-btn'>Go!</button>
          </form>
        </div>
      )
    }
  }