import useUserInput from "../../hooks/use-input";
import Modal from "../UI/Modal";
import "./CheckOut.css";
const CheckOut = (props) => {
  // const mobileInputRef = useRef();
  // const nameInputRef = useRef();
  // const emailInputRef = useRef();
  // const addressInputRef = useRef();
  const {
    value: enteredNameValue,
    isValid: isNameValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurhandler: nameBlurhandler,
    reset: resetName
  } = useUserInput((value) => value.trim() !== "" && /[^0-9]/.test(value));
  const {
    value: enteredMobileValue,
    isValid: isMobileValid,
    hasError: mobileHasError,
    valueChangeHandler: mobileChangeHandler,
    inputBlurhandler: mobileBlurhandler,
    reset: resetMobile
  } = useUserInput((value) => value.length === 10 && /[0-9]/.test(value));
  const {
    value: enteredEmailValue,
    isValid: isEmailValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurhandler: emailBlurhandler,
    reset: resetEmail
  } = useUserInput((value) => value.includes("@") && value.includes("."));
  const {
    value: enteredAddressValue,
    isValid: isAddressValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurhandler: addressBlurhandler,
    reset: resetAddress
  } = useUserInput((value) => value.trim() !== "");

  let isFormValid = false;
  if (isEmailValid && isMobileValid && isAddressValid && isNameValid) {
    isFormValid = true;
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!isNameValid || !isEmailValid || !isMobileValid || !isAddressValid) {
      return;
    }
    props.onOrderDetails({
      name: enteredNameValue,
      mobile: enteredMobileValue,
      email: enteredEmailValue,
      address: enteredAddressValue
    });
    resetName();
    resetEmail();
    resetMobile();
    resetAddress();
  };
  const nameControlClass = nameHasError
    ? "form-control invalid"
    : "form-control";
  const mobileControlClass = mobileHasError
    ? "form-control invalid"
    : "form-control";
  const emailControlClass = emailHasError
    ? "form-control invalid"
    : "form-control";
  const addressControlClass = addressHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <>
      <Modal>
        <form onSubmit={formSubmitHandler}>
          <div className="checkOutTitle">Enter Your Details For Checkout</div>
          <div className="control-group">
            <div className={nameControlClass}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={enteredNameValue}
                onChange={nameChangeHandler}
                onBlur={nameBlurhandler}
              />
              {nameHasError && <p className="error-text">Name is Invalid</p>}
            </div>
            <div className={mobileControlClass}>
              {/* <Input
                label={"Mobile No"}
                ref={mobileInputRef}
                input={{
                  type: "number",
                  id: "mobile",
                  value: { enteredMobileValue },
                  onChange: {()=>{mobileChangeHandler} },
                  onBlur: { mobileBlurhandler }
                }}
              /> */}
              <label htmlFor="name">Mobile No</label>
              <input
                type="number"
                id="mobile"
                value={enteredMobileValue}
                onChange={mobileChangeHandler}
                onBlur={mobileBlurhandler}
              />
              {mobileHasError && (
                <p className="error-text">Mobile Number is Invalid</p>
              )}
            </div>
            <div className={emailControlClass}>
              <label htmlFor="name">E-Mail Address</label>
              <input
                type="text"
                id="ename"
                value={enteredEmailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurhandler}
              />
              {emailHasError && <p className="error-text">Email is Invalid</p>}
            </div>
            <div className={addressControlClass}>
              <label htmlFor="name">Address</label>
              <input
                type="text"
                id="address"
                value={enteredAddressValue}
                onChange={addressChangeHandler}
                onBlur={addressBlurhandler}
              />
              {addressHasError && (
                <p className="error-text">Address is Invalid</p>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button disabled={!isFormValid}>Confirm</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default CheckOut;
