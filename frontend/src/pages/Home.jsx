import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Pagination from '../components/Pagination';
import { useLazyGetProductsQuery } from '../services/products';

const Home = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [trigger, result] = useLazyGetProductsQuery(); // trigger API call when props change

  useEffect(() => {
    // eslint-disable-next-line , object-shorthand
    trigger({ page: currentPage, category: category, sort: sort, search: search });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, sort, currentPage]);

  const { data, error, isLoading } = result;

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const onSortChange = (e) => {
    setSort(e.target.value);
  };
  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center w-screen">
        <div className="flex justify-center w-full items-center border-b">
          <div className="container">
            <SideBar
              onCategoryChange={onCategoryChange}
              onSortChange={onSortChange}
              category={category}
              sort={sort}
              onSearchChange={onSearchChange}
            />
          </div>
        </div>

        <div className="flex flex-col container items-center">
          <div className="flex flex-wrap justify-center w-full flex-none p-4">
            <ProductCard data={data} error={error} isLoading={isLoading} />
          </div>
          <div className="flex justify-center">
            <Pagination currentPage={currentPage} onPageChange={onPageChange} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
