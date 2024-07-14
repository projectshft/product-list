'use client';

import { ProductContainer } from './components/ProductContainer';
import { ProductPageNav } from './components/ProductPageNav';
import { ProductControls } from './components/ProductControls';

export default function Home() {
  return (
    <main>
      <ProductControls />
      <ProductContainer />
      <ProductPageNav />
    </main>
  );
}
