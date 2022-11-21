import React from 'react';
import Prompt  from './features/prompt/Prompt';
import ProductCard from './features/product/ProductCard';
import { Paginator } from './features/paginator/Paginator';

function App() {
  return (
    <div>
      <Prompt/>
      <ProductCard/>
      <Paginator/>
    </div>
  )
}

export default App;
