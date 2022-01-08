import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import style from "./header.module.css";

const Header = () => {
  const { cartSize } = useContext(CartContext);

  return (
    <header className={style.header}>
      <div className={style.container}>
        <nav className={style.header_nav}>
          <div className={style.brand}>
            <NavLink className={style.text_logo} to="/">
              SD Perfumes
            </NavLink>
          </div>
          <div class={style.header_nav2}>
            <div class={style.text_nav}><NavLink to="/contact" >Contact</NavLink></div>
            {
              localStorage.getItem('token')?.split('.').length==2?(
            <div class={style.text_nav}><NavLink to="/logout">logout</NavLink></div>
              ):(
            <div class={style.text_nav}><NavLink to="/auth" >Login/Register</NavLink></div> 
              )
            }
            <NavLink to="/cart" className={style.cart}>
              {cartSize || (
                <span className="material-icons">shopping_cart</span>
              )}
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
