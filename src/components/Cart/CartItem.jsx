import classes from "./CartItem.module.css";

const CartItem = (props) => {
  let action = "classes.actions";
  if (props.disable) {
    action = `${classes.action} ${classes.hidden}`;
  }

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>${props.item.price}</span>
          <span className={classes.amount}>x{props.item.amount}</span>
        </div>
      </div>

      <div className={action}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};
export default CartItem;
