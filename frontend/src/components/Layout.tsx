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
  query,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalResults: number;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
}) {
  return (
    <div className="mx-auto relative min-h-screen">
      <NavBar
        setCategory={setCategory}
        setPage={setPage}
        setPrice={setPrice}
        setQuery={setQuery}
      />
      {query.length > 0 ? (
        <div className="bg-green-500 text-white">
          <span className="ms-4">
            <b>Current Search:</b> {query}
          </span>
          <br />
          <button
            className="rounded bg-red-500 px-2 ms-4 mb-2 mt-2"
            onClick={() => setQuery("")}
          >
            Clear Search
          </button>
        </div>
      ) : (
        ""
      )}
      <Outlet />
      <Footer page={page} setPage={setPage} totalResults={totalResults} />
    </div>
  );
}

export default Layout;
