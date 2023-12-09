import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout({
  page,
  setPage,
  totalResults,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalResults: number;
}) {
  return (
    <div className="mx-auto relative min-h-screen">
      <NavBar />
      <Outlet />
      <Footer page={page} setPage={setPage} totalResults={totalResults} />
    </div>
  );
}

export default Layout;
