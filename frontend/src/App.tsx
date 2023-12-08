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
      <footer className="relative w-full">
        <div className="fixed inset-x-0 bottom-0 text-center">Footer</div>
      </footer>
    </div>
  );
}

export default App;
