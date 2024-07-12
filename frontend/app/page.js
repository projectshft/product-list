'use client';

import { ProductContainer } from './components/ProductContainer';
import { ProductPageNav } from './components/ProductPageNav';

export default function Home() {
  return (
    <main>
      <ProductPageNav />
      <ProductContainer />
    </main>
  );
}
