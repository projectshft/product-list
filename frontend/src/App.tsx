import NavBar from "./components/NavBar";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="contaner mx-auto">
      <NavBar />
      <SearchResults />
      <Footer />
    </div>
  );
}

export default App;
