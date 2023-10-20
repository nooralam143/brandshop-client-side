import { NavLink } from "react-router-dom";
import './style.css'
const links = <>
  <NavLink to="/add-product"><button className="sideMenu">Add Product</button></NavLink>
  <NavLink to="/add-brand"><button className="sideMenu">Add Brand</button></NavLink>
  <NavLink to="/products"><button className="sideMenu">All Products</button></NavLink>
</>
const Sidebar = () => {
  return (
    <div className="w-2/12 bg-[#e2e2e2] h-screen text-black p-4">
      <h2 className="text-2xl font-semibold mb-4">Menu</h2>
      <div className="btn-group btn-group-vertical">
        {links}
      </div>
    </div>
  );
};
export default Sidebar;