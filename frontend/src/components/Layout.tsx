import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout({
  page,
  setPage,
  totalResults,
  setCategory,
  setPrice,
  setQuery,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalResults: number;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="mx-auto relative min-h-screen">
      <NavBar setCategory={setCategory} setPage={setPage} setPrice={setPrice} setQuery={setQuery} />
      <Outlet />
      <Footer page={page} setPage={setPage} totalResults={totalResults} />
    </div>
  );
}

export default Layout;
