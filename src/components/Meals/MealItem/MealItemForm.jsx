import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputref = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    let enteredAmount = amountInputref.current.value;
    enteredAmount = +enteredAmount;

    if (enteredAmount < 1 || enteredAmount > 5) {
      setAmountIsValid(false);
      return;
    }
    setAmountIsValid(true);
    props.onAddToCart(enteredAmount);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label={"Amount"}
        ref={amountInputref}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1"
        }}
      />
      <button>+ ADD</button>
      {!amountIsValid && <p>The Amount is Not valid</p>}
    </form>
  );
};
export default MealItemForm;
