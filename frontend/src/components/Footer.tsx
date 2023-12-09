function Footer({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}) {
  const numPages = totalPages / 9;

  const resultPages = () => {
    const result = [];
    for (let i = 0; i < numPages; i++) {
      result.push(
        <span className="mx-4 text-blue-500 hover:text-blue-700 hover:cursor-pointer">
            {i + 1}
        </span>
      );
    }

    return result;
  };

  return (
    <footer className="absolute bottom-0 w-full  bg-orange-200 mt-8 py-4 border border-orange-400">
      <div className="inset-x-0 bottom-0 text-center overflow-hidden mx-10 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="me-8 w-6 h-6 inline-block hover:cursor-pointer text-blue-900 hover:text-blue-700"
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
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </footer>
  );
}

export default Footer;
