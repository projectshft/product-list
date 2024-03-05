'use client';
import 'bootstrap/dist/css/bootstrap.css'
import Header from '../components/Header';
import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <main>
      <Header />
      <ProductList />
    </main>
  );
}
