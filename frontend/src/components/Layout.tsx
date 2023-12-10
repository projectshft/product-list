import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout({
  page,
  setPage,
  totalResults,
  setCategory
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalResults: number;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="mx-auto relative min-h-screen">
      <NavBar setCategory={setCategory} setPage={setPage} />
      <Outlet />
      <Footer page={page} setPage={setPage} totalResults={totalResults} />
    </div>
  );
}

export default Layout;
