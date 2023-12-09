import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout( {page, setPage} : {page: number, setPage: React.Dispatch<React.SetStateAction<number>>}) {
  return (
    <div className="mx-auto relative min-h-screen">
      <NavBar />
      <Outlet />
      <Footer page={page} setPage={setPage} />
    </div>
  );
}

export default Layout;
