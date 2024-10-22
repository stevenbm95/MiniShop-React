import { Link } from "react-router-dom";
import Cart from "../components/cart/Cart";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex">
      <Link className="btn btn-ghost text-xl" to="/">MiniShop</Link> 
        {/* <a className="btn btn-ghost text-xl">MiniShop</a> */}
      </div>   
    
  <div className="navbar-center flex-1 justify-center">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/admin">Administracion</Link></li>
      <li><Link to="/products">Productos</Link></li>
      <li><Link to="/cart">Carrito</Link></li>
      {/* <li><a>Item 3</a></li> */}
    </ul>
      </div>      
      <div className="flex-none">
       <Cart />

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
