import { useState } from "react";

function NavBar() {
  const [hidden, setHidden] = useState("hidden");
  const [displayBlock, setDisplayBlock] = useState("hidden");
  const [priceDisplayBlock, setPriceDisplayBlock] = useState("hidden");

  const showNavItems = () => {
    if (hidden === "hidden") {
      setHidden("");
    } else {
      setHidden("hidden");
    }
  };

  return (
    <nav className="sticky bg-gray-300 p-3 border border-gray-400 flex flex-wrap w-full px-4">
      <input
        type="text"
        className="px-1 rounded border-2 border-slate-500 bg-slate-100 w-1/3"
        placeholder="Search for a product"
        id="search"
        onKeyDown={() => console.log("key press")}
        onChange={() => console.log("change")}
        value=""
      />
      <button className="rounded bg-blue-900 px-2 border-2 border-blue-900 text-white hover:bg-blue-700 hover:border-blue-700 ms-2">
        Search
      </button>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-8 h-8 cursor-pointer sm:hidden ms-auto"
        onClick={showNavItems}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>

      <div className={`${hidden} w-full sm:flex sm:items-center sm:w-auto`}>
        <ul className="sm:flex sm:justify-between sm:mt-0 mt-3 sm:mx-5">
          <li>
            <div className="relative inline-block">
              <button
                className="rounded px-2 bg-slate-400 hover:bg-slate-500"
                onMouseOver={() => setDisplayBlock("block")}
                onMouseLeave={() => setDisplayBlock("hidden")}
              >
                Category
              </button>
              <div
                className={`${displayBlock} absolute rounded bg-slate-200 min-w-min z-10`}
                onMouseOver={() => setDisplayBlock("block")}
                onMouseLeave={() => setDisplayBlock("hidden")}
              >
                <a
                  className="text-black ps-3 pe-4 block hover:bg-slate-300"
                  href="#"
                >
                  Music
                </a>
                <a
                  className="text-black ps-3 pe-4 block hover:bg-slate-300"
                  href="#"
                >
                  Movies
                </a>
                <a
                  className="text-black ps-3 pe-4 block hover:bg-slate-300"
                  href="#"
                >
                  Kids
                </a>
                <a
                  className="text-black ps-3 pe-4 block hover:bg-slate-300"
                  href="#"
                >
                  Baby
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="relative inline-block sm:mx-4 mt-3 sm:mt-0">
              <button
                className="rounded px-2 bg-slate-400 hover:bg-slate-500"
                onMouseOver={() => setPriceDisplayBlock("block")}
                onMouseLeave={() => setPriceDisplayBlock("hidden")}
              >
                Price
              </button>
              <div
                className={`${priceDisplayBlock} absolute rounded bg-slate-200 min-w-min z-10`}
                onMouseOver={() => setPriceDisplayBlock("block")}
                onMouseLeave={() => setPriceDisplayBlock("hidden")}
              >
                <a
                  className="text-black ps-3 pe-4 block hover:bg-slate-300"
                  href="#"
                >
                  Lowest
                </a>
                <a
                  className="text-black ps-3 pe-4 block hover:bg-slate-300"
                  href="#"
                >
                  Highest
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
