import { useContext } from "react";
import Button from "./ui-components/Button.jsx";
import logo from "../assets/logo.png";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>Food Order App</h1>
      </div>
      <nav>
        <Button text className="shopping-cart" onClick={handleShowCart}>
          <FaShoppingCart className="shopping-icon" />
          <span> Cart ({totalCartItems})</span>
        </Button>
      </nav>
    </header>
  );
}
