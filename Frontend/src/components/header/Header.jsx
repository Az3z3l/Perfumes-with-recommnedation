import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import style from "./header.module.css";
import "./header.css";
const Header = ({ setSearch, search }) => {
  const { cartSize } = useContext(CartContext);
  const [menu, setmenu] = useState(false);
  return (
    <header
      className={
        !["admin_H0W41294EN","profile"].includes(document.location.pathname.replace('/','')?.split('/')[0]) ? style.header : "hidden"
      }
    >
      <div className="custombg w-100 h-auto shadow-lg mb-2 -mt-4">
        <div className="p-5">
          <div className="flex justify-between mx-20 text-center items-center">
            <div class="font-semibold text-gray-500">Call us 0012804227</div>
            <div className="flex gap-8">
              <div className="flex gap-10 font-semibold text-gray-500">
                <NavLink to="/" className="text-center cursor-pointer">
                  Home
                </NavLink>
                <NavLink to="/shop" className="text-center cursor-pointer">
                  Shop
                </NavLink>
                <NavLink to="/contact" className="text-center cursor-pointer">
                  Contact Us
                </NavLink>
              </div>
              |
              <div>
                {localStorage.getItem("token")?.split(".").length == 2 ? (
                  <div class="font-semibold text-gray-500">
                    <NavLink to="/logout">logout</NavLink>
                  </div>
                ) : (
                  <div class="font-semibold text-gray-500">
                    <NavLink to="/auth">Login/Register</NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <nav className={style.header_nav}>
          <div className={style.brand}>
            <NavLink className={style.text_logo} to="/">
              SD PERFUMERY
            </NavLink>
          </div>
          <div class=" mx-auto hidden md:flex">
            <div class="flex border-2 rounded">
              <button class="flex items-center justify-center px-4 border-r">
                <svg
                  class="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
                </svg>
              </button>
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                class="px-4 py-2 w-80"
                placeholder="Search..."
              />
            </div>
          </div>
          <div class={style.header_nav2}>
            <div class={style.text_nav}>
              {localStorage.getItem("token")?.split(".").length == 2 ? (
                <div class="">
                  <div onClick={(e)=>{
                    document.location="/profile"
                  }}>
                    {atob(localStorage.getItem("token")?.split(".")[1])}
                  </div>
                </div>
              ) : (
                <div class="font-semibold text-gray-500">
                  <NavLink to="/auth"></NavLink>
                </div>
              )}
            </div>
            <NavLink to="/cart" className={style.cart}>
              {cartSize || (
                <span className="material-icons">shopping_cart</span>
              )}
            </NavLink>
          </div>
          <div
            class="md:hidden flex-col flex items-center space-x-1"
            onClick={() => setmenu(!menu)}
          >
            X
          </div>
        </nav>
      </div>
      <div
        class={
          menu ? "md:hidden flex-col flex items-center space-x-1" : "hidden"
        }
      >
        <NavLink
          to="/"
          class="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold "
        >
          Home
        </NavLink>
        <NavLink
          to="/Shop"
          class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
        >
          Shop
        </NavLink>
        <NavLink
          to="/cart"
          class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
        >
          Cart
        </NavLink>
        <NavLink
          to="/contact"
          class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
        >
          Contact Us
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
