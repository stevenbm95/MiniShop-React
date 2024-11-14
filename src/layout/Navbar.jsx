import { Link } from "react-router-dom";
import Cart from "../components/cart/Cart";
import { useState } from "react";
import useSotreAuth from "../stores/auth/StoreAuth";
import useStoreCart from "../stores/cart/StoreCart";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const {resetCart} = useStoreCart()
  const { isAuthenticated, logout, setIsRegister} = useSotreAuth();
  const {isAuth } = isAuthenticated();
  const navigate = useNavigate();

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  };

  const handleRegister = () => {
    setIsRegister(true);
  }

  const handleLogin = () => {
    setIsRegister(false);
  }
  

  const handleLogout = () => {
    logout();
    resetCart();
    navigate("/");
  }


  return (
    <div className="navbar bg-base-100">
      <div className="flex">
        <Link className="btn btn-ghost text-xl" to="/">
          MiniShop
        </Link>
        {/* <a className="btn btn-ghost text-xl">MiniShop</a> */}
      </div>

      <div className="navbar-center flex-1 justify-center">
        <ul className={ isAuth ? "menu menu-horizontal px-1" : 'hidden' }>
    
          <li>
            <div>
              <button onClick={() => toggleDropdown("productos")}>
                Productos
              </button>
              {activeDropdown === "productos" && (
                <ul className=" absolute bottom-[-5.5rem] left-[-1.5rem] p-2 bg-base-100 rounded-box shadow z-[1]">
                  <li>
                    <Link to="/admin" onClick={() => setActiveDropdown(null)}>
                      Administracion
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Productos
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li>
            <Link to="/customers" onClick={() => setActiveDropdown(null)}>
              Clientes
            </Link>
          </li>

          <li>
            <Link to="/cart" onClick={() => setActiveDropdown(null)}>
              Carrito
            </Link>
          </li>
          {/* <li><a>Item 3</a></li> */}
        </ul>
       
      </div>
        <div className={ isAuth ? "hidden" : "font-bold" }>
          <Link className="" to="/auth" onClick={() => handleRegister()}> <span className="px-5">Registrate </span></Link> 
          <Link className="" to="/auth" onClick={()=> handleLogin()}><span className="px-5">Login </span></Link>
        </div>
      <div className={isAuth ? "flex-none" : "hidden"}>
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
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
