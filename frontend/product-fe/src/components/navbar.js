export default function Products() {
  return (
    <div>
      <header className="shadow-sm">
        <div class="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
          <div class="flex items-center gap-4">
            <form class="mb-0 lg:flex">
              <div class="relative">
                <input
                  class="h-10 rounded-lg border-gray-200 pr-10 text-sm placeholder-gray-300 focus:z-10"
                  placeholder="Search..."
                  type="search"
                />

                <button
                  type="submit"
                  class="absolute inset-y-0 right-0 rounded-r-lg p-2 text-gray-600"
                >
                  <svg
                    class="h-5 w-5"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div class="items-center gap-4 lg:flex">
            <input
              class="h-10 rounded-lg border-gray-200 pr-10 text-sm placeholder-gray-300 focus:z-10"
              placeholder="Search..."
              type="search"
            />
            <input
              class="h-10 rounded-lg border-gray-200 pr-10 text-sm placeholder-gray-300 focus:z-10"
              placeholder="Search..."
              type="search"
            />
          </div>
        </div>
      </header>
    </div>
  );
}
