import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "../Cart/CartItem";
import Modal from "../UI/Modal";
import classes from "./OrderDetails.module.css";

const OrderDetails = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [orderId, setOrderId] = useState("");
  let orders = [];
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        orders.push(item);
        return <CartItem key={item.id} item={item} disable={true}></CartItem>;
      })}
    </ul>
  );
  const bookOrder = async () => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-http-practice-b4a1b-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          order: orders,
          totalAmount: totalAmount,
          user: props.userData
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const data = await response.json();
    setOrderId(data.name);
    setIsSubmitting(false);
    setDidSubmit(true);

    // alert("Order Placed Succesfully \n Your order id is:" + data.name);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Order Placed");

    bookOrder();
    // alert("Order Completed");
  };
  const finishOrder = () => {
    cartCtx.clearCart();
    props.onCloseModal();
  };
  const cancelOrder = () => {
    console.log("Order cancelled");
    props.onCloseModal();
  };
  const cartModal = (
    <>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.orderTitle}>Confirm Your Order</div>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>

        <div className={classes["control-group"]}>
          <div className={classes["form-control"]}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={props.userData.name}
              readOnly={true}
            />
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="name">Contact No</label>
            <input
              type="number"
              id="mobile"
              value={props.userData.mobile}
              readOnly={true}
            />
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="name">Email ID</label>
            <input
              type="email"
              id="email"
              value={props.userData.email}
              readOnly={true}
            />
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="name">Address</label>
            <input
              type="text"
              id="address"
              value={props.userData.address}
              readOnly={true}
            />
          </div>
        </div>
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            type="button"
            onClick={cancelOrder}
          >
            close
          </button>

          <button className={classes.button} type="submit">
            Finish
          </button>
        </div>
      </form>
    </>
  );
  const didSubmitedModal = (
    <>
      <p className={classes.orderTitle}>
        Thank You for your Purchase {props.userData.name}
      </p>
      <br />
      <p className={classes.orderTitle}>Successfully Submitted your order!</p>
      <br />
      <p className={classes.orderTitle}>Your Order id is: {orderId}</p>
      <br />
      <p className={classes.orderTitle}>
        Keep the amount in handy: {totalAmount}{" "}
      </p>
      <br />
      <button className={classes.button} type="button" onClick={finishOrder}>
        Okay
      </button>
    </>
  );
  const isSubmittingModal = (
    <p className={classes.orderTitle}>Order getting confirmed !</p>
  );

  return (
    <>
      <Modal>
        {!isSubmitting && !didSubmit && cartModal}
        {isSubmitting && isSubmittingModal}
        {!isSubmitting && didSubmit && didSubmitedModal}
      </Modal>
    </>
  );
};
export default OrderDetails;
