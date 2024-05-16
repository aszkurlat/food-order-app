import Cart from "./components/Cart.jsx";
import Header from "./components/Header.jsx";
import MealList from "./components/MealList.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <MealList />
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
