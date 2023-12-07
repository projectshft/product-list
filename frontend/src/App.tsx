import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="contaner mx-auto">
      <NavBar />
      <div className="columns-1 sm:columns-3 mx-auto">
        <h1 className="text-center">Column 1</h1>
        <h1 className="text-center">Column 2</h1>
        <h1 className="text-center">Column 3</h1>
      </div>
    </div>
  );
}

export default App;
