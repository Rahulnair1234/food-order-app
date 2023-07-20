import { useState } from "react";
import Cart from "./components/Cart/Cart";
import CheckOut from "./components/Checkout/CheckOut";
import OrderDetails from "./components/Checkout/OrderDetails";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [checkOutIsShown, setCheckOutIsShown] = useState(false);
  const [ordertIsShown, setOrderIsShown] = useState(false);
  const [userdata, setUserData] = useState({});
  const checkoutPageVisibilitityHandler = () => {
    setCheckOutIsShown(true);
    setCartIsShown(false);
  };
  const showCarthandler = () => {
    setCartIsShown(true);
  };
  const hideCarthandler = () => {
    setCartIsShown(false);
  };
  const hideOrderhandler = () => {
    setOrderIsShown(false);
  };
  const OrderDetailsConfirmHandler = (userData) => {
    setCheckOutIsShown(false);
    setUserData(userData);
    console.log(userdata);
    setOrderIsShown(true);
  };
  return (
    <CartProvider>
      {cartIsShown && (
        <Cart
          onCloseModal={hideCarthandler}
          onCheckout={checkoutPageVisibilitityHandler}
        />
      )}
      {checkOutIsShown && (
        <CheckOut onOrderDetails={OrderDetailsConfirmHandler} />
      )}
      {ordertIsShown && (
        <OrderDetails userData={userdata} onCloseModal={hideOrderhandler} />
      )}
      <Header onShowCart={showCarthandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
