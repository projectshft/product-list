import { Link } from 'react-router-dom';

const Header = () => (
  <div className="flex justify-center items-center h-14 mb-5 bg-black text-stone-50">
    <div className="container flex justify-between">
      <Link to="/" className=" px-4 py-2">
        HOME
      </Link>
      <Link to="/new-product" className="bg-stone-600 text-stone-50 px-3 py-1 self-center">
        + Add New Product
      </Link>
    </div>
  </div>
);

export default Header;
