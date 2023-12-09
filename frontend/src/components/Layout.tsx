import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}) {
  return (
    <div className="mx-auto relative min-h-screen">
      <NavBar />
      <Outlet />
      <Footer page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}

export default Layout;
