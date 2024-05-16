import logo from "../assets/logo.jpg";
import Button from "./ui-components/Button";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>Food Order App</h1>
      </div>
      <nav>
        <Button text>Cart (0)</Button>
      </nav>
    </header>
  );
}
