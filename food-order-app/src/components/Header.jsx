import logo from "../assets/logo.jpg";
import Button from "./ui-components/Button";
import CartContext from "../store/CartContext.jsx";
import { useContext } from "react";

export default function Header() {
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>Food Order App</h1>
      </div>
      <nav>
        <Button text>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
