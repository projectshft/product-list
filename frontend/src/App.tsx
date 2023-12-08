import NavBar from "./components/NavBar";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <div className="contaner mx-auto">
      <NavBar />
      <SearchResults />
      <footer className="relative w-full">
        <div className="fixed inset-x-0 bottom-0 text-center">Footer</div>
      </footer>
    </div>
  );
}

export default App;
