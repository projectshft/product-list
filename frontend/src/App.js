import React from 'react';
import Header from './components/header'
import Search from './features/search/Search'
import './App.css';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className='container'>
        <Search/>
      </div>
    </div>
  );
}

export default App;
