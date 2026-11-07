
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>MENU</h3>

      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart</NavLink>
      <NavLink to="/orders">Orders</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </aside>
  );
}

export default Sidebar;
