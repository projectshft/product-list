function NavBar() {
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
      <div className="hidden w-full sm:flex sm:items-center sm:w-auto ">
        <ul className="flex sm:justify-between mx-8">
          <li>
            <a className="block mx-4" href="#">
              Category
            </a>
          </li>
          <li>
            <a className="block ms-4" href="#">
              Price
            </a>
          </li>
        </ul>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-8 h-8 cursor-pointer sm:hidden ms-auto"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </nav>
  );
}

export default NavBar;
