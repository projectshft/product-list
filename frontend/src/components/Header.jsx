import { Link } from 'react-router-dom';

const Header = () => (
  <div className="flex justify-center items-center h-14 mb-5 bg-slate-400 text-slate-400">
    <div className="container">
      <Link to="/" className="bg-white px-4 py-2">
        HOME
      </Link>
    </div>
  </div>
);

export default Header;
