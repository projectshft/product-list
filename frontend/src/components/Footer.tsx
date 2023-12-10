function Footer({
  page,
  setPage,
  totalResults,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalResults: number;
}) {
  const numPages = Math.floor(totalResults / 9);

  const resultPages = () => {
    const result = [];

    const num = numPages - page <= 5 ? numPages : page + 5;

    for (let i = page; i < num; i++) {
      result.push(
        <span className="mx-4 text-blue-500 hover:text-blue-700 hover:cursor-pointer">
          {i + 1}
        </span>
      );
    }

    return result;
  };

  const showNextPage = (currentPage: typeof page) => {
    if (currentPage < numPages - 1) {
      setPage(page + 1);
    }
  };

  const showPrevPage = (currentPage: typeof page) => {
    if (currentPage > 0) {
      setPage(page - 1);
    }
  };

  return (
    <footer className="absolute bottom-0 w-full  bg-orange-200 mt-8 py-4 border border-orange-400 ">
      <div className="inset-x-0 bottom-0 text-center overflow-hidden mx-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="me-8 w-6 h-6 inline-block hover:cursor-pointer text-blue-900 hover:text-blue-700"
          onClick={() => showPrevPage(page)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
            
          />
        </svg>
        {resultPages()}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="ms-8 w-6 h-6 inline-block hover:cursor-pointer text-blue-900 hover:text-blue-700"
          onClick={() => showNextPage(page)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        <br />
        <p className="mt-2">
          Showing page <b className="text-gray-700">{page + 1}</b> of{" "}
          <b className="text-gray-700">{numPages}</b> pages
        </p>
      </div>
    </footer>
  );
}

export default Footer;
