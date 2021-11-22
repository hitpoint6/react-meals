import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  const cartOpenHandler = function () {
    setCartOpen(true);
  };

  const cartCloseHandler = function () {
    setCartOpen(false);
  };

  return (
    <CartProvider>
      {cartOpen && <Cart onClose={cartCloseHandler} />}
      <Header onOpen={cartOpenHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
