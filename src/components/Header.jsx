
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
  }

  return (
    <header className="header">
      <h2>ShopAdmin</h2>

      <input type="text" placeholder="Search..." />

      <div className="header-right">
        <span>{localStorage.getItem("userEmail")}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
