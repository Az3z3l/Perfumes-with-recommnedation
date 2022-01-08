import { lazy, Suspense,useState,useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CartProvider } from './context/cartContext';
import Header from './components/header/Header';
import { Loader } from './components/loader/Loader';
import  { Redirect } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import AdminProd from './components/Admin/products/Product.jsx'
import AdminCustomer from './components/Admin/customers/Customer'
import AdminToken from './components/Admin/Tokens/Token'
import OrdersPreview from './components/Admin/Orders/Orders'

const Cart = lazy(() => import('./views/cart/Cart'));
const Login = lazy(() => import('./views/Authentication/loginreg'));
const Home = lazy(() => import('./views/homepage/Home'));
const Admin = lazy(() => import('./views/Admin/Admin'));
const Shop = lazy(() => import('./views/Shop/Shop'));
const Contact = lazy(() => import('./views/Contact/Contact.js'));
const ViewProduct = lazy(() => import('./views/product/ViewProduct'));
const Profile = lazy(() => import('./views/Profile/Profile'));

const Logout=()=>{
  localStorage.removeItem("token");
   document.location='/'
}



function App() {

  const [search, setSearch] = useState('')

  useEffect(() => {

  }, [search]);
  
  return (
    <CartProvider>
      <Router>
        <>
          <Header setSearch={setSearch} search={search} />
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/" exact render={() => <Home setSearch={setSearch} search={search}/>}/>
              <Route path="/product/:id" component={ViewProduct} />
              <Route path="/cart" component={Cart} />
               <Route path="/shop" render={() => <Shop setSearch={setSearch} search={search}/>} />
              <Route path="/auth" component={Login} />
              <Route path="/contact" component={Contact} />
              <ProtectedRoute exact path="/profile" component={Profile}/>
              <ProtectedRoute exact path="/admin_H0W41294EN" component={AdminProd} />
              <ProtectedRoute exact path="/admin_H0W41294EN/products" component={AdminProd} />
              <ProtectedRoute exact path="/admin_H0W41294EN/customers" component={AdminCustomer} />
              <ProtectedRoute exact path="/admin_H0W41294EN/token" component={AdminToken} />
              <ProtectedRoute exact path="/admin_H0W41294EN/Orders" component={OrdersPreview} />
              <Route path='/logout' component={Logout}/>
              <Route path="*" component={Home} />
            </Switch>
          </Suspense>
        </>
      </Router>
    </CartProvider>
  );
}

export default App;
