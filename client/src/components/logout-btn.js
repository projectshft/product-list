
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // await fetch('/auth/logout'); // Optional: confirm logout
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;