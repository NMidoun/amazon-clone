import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFirestore } from "./contexts/FirestoreContext";
import { useAuth } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/App.css';

import { addProduct, clearCart } from "./features/cartSlice";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Checkout from "./components/Checkout/Checkout";
import Header from './components/Header/Header';
import Register from "./components/Login/Register";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import MyAccount from "./components/Login/MyAccount";
import ComingSoon from "./components/ComingSoon/ComingSoon";
import NoMatchRoute from "./components/NoMatchRoute/NoMatchRoute";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { getCart, getProducts, products } = useFirestore();

  // import products
  useEffect(() => {
    getProducts("products", "lr6XzSGYDXX4mdwqap2Y");
  }, []);

  // clear cart before login/Logout
  useEffect(() => {
    dispatch(clearCart());
  }, [currentUser]);
  
  // import cart
  useEffect(() => {
    if (products.length > 0) {
      if (!currentUser) {
        const localCart = JSON.parse(localStorage.getItem("cart"));
        if (localCart) {
          localCart.forEach((product) => {
            const index = products.findIndex((el) => el.id === product.id);
            const productUpdated = { ...products[index], ...product };
            dispatch(addProduct(productUpdated));
          });
        }
      }
      
      if (currentUser) {
        getCart("carts", currentUser.uid);
      }
    }
  }, [currentUser, products]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><Header/> <Home/></ProtectedRoutes>} />
        <Route path="checkout" element={<ProtectedRoutes><Header/> <Checkout/></ProtectedRoutes>} />
        <Route path="comingSoon" element={<ProtectedRoutes><Header /> <ComingSoon /></ProtectedRoutes>} />
        <Route path="login" element={<ProtectedRoutes><Login /></ProtectedRoutes>} />
        <Route path="login/register" element={<ProtectedRoutes><Register /></ProtectedRoutes>} />
        <Route path="login/myAccount" element={<ProtectedRoutes><Header /><MyAccount /></ProtectedRoutes>} />
        <Route path='*' element={<ProtectedRoutes><Header /><NoMatchRoute /></ProtectedRoutes>} />
      </Routes>
    </Router>
  );
}

export default App;