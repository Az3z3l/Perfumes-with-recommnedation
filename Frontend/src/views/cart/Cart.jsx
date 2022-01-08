import { useState, useContext, useLayoutEffect } from 'react';
import CartProduct from '../../components/cartProduct/CartProduct';
import { CartContext } from '../../context/cartContext';
import style from './cart.module.css';
import axios from "axios";

const Cart = () => {
  const { cart, totalCost } = useContext(CartContext);
  const [coShown, setCOShown] = useState(false);
  const [dcode, setDcode] = useState(0);
  const [redprice, setredprice] = useState(0);
    const [discound, setdiscound] = useState(0);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('noscroll-web');
    document.body.classList.add('trans');
  }, []);

  const  handleCheckOut=async ()=> {
    let products=[]
    cart.map((i,j)=>{
      products.push({"name":i.product.name,"qty":i.qty,"image":i.product.images[0]})
    })
    let data={"email":atob(localStorage.getItem('token').split('.')[1]),"products":products,"totalCost":totalCost.toFixed(2)}

    await axios
      .post(`http://localhost:3000/api/orders/`, data)
      .then((res) => {

      });
    alert('Checkout -\n Your order of  Subtotal : රු ' + totalCost+'\n Has been confirmed pess ok to continue');
    document.location='/';
  }
  const Upd=(e)=>{
    if(e.target.value){
      setDcode(e.target.value)
    }else{
      setDcode(0)
    }
  }
  const Verify=async()=>{
    let data={"token":dcode}
    await axios
      .post(`http://localhost:3000/api/tokens/check`, data)
      .then((res) => {
        if (res.data.data.products[0]?.price) {
          setdiscound(res.data.data.products[0].price)
          setredprice(totalCost.toFixed(2)-((res.data.data.products[0].price/100)*totalCost.toFixed(2)));
        }else{
          alert('Invalid Token')
        }
      });
    
  }
  console.log(cart);
  return (
    <div className={style.page}>
      <div className={style.wrapper}>
        {cart.length > 0 ? (
          <div className={style.items}>
            {cart.map((cartItem) => (
              <CartProduct cartItem={cartItem} key={cartItem.id} />
            ))}
          </div>
        ) : (
          <div className={style.empty}>Cart Empty</div>
        )}
        <div
          className={`${style.checkout} ${coShown ? style.checkout_shown : ''}`}
        >
          <h2>Order Summary</h2>
          <div className={style.total_box}>
            <div className={style.total_box_content}>
              <div className={style.total_item}>
                <div className="text">Bag Total</div>
                <div className="price">{totalCost.toFixed(2)}</div>
              </div>
              <div className={style.total_item}>
                <div className="text">Shipping</div>
                <div className="price">Free</div>
              </div>
              <div className={`${style.total_item} ${style.coupon}`}>
                <div className="text">Discount</div>
                <div className="price">{discound}%</div>
              </div>
              <div className={`${style.total_item} ${style.coupon2}`}>
                <span className="pt-2">Discount Code</span><input onChange={(e)=>Upd(e)} className="border-2 border-black" type="text"/>
                <button onClick={Verify} className="price">Verify</button>
              </div>
              <div className={style.total_item}>
                <div className="text">Total</div>
                <div className="price">{redprice?(<> <del className="text-black">{totalCost.toFixed(2)}</del>{"  "+redprice}</>):totalCost.toFixed(2)}</div>
              </div>
            </div>
            <div className={style.checkout_footer}>
              <button onClick={handleCheckOut} disabled={!cart.length}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => setCOShown(!coShown)}
        className={`${style.toggle_btn} ${coShown ? style.toggle_close : ''}`}
      >
        <span className="material-icons">keyboard_arrow_left</span>
      </button>
    </div>
  );
};

export default Cart;
