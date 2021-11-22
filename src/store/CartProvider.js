import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCart = {
  // items: [{amount: 1, id: 'm1', name: 'sushi', price: 22.99}, {}, {}...]
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingItemId = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemId];
    let updatedItems;
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemId] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE") {
    console.log(state.items);
    const existingItemId = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemId];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount > 1) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemId] = updatedItem;
    } else {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCart;
};

const CartProvider = (props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCart);
  const AddItemToCartHandler = function (item) {
    cartDispatch({
      type: "ADD",
      item: item,
    });
  };
  const RemoveItemFromCartHandler = function (id) {
    cartDispatch({
      type: "REMOVE",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    AddItemToCart: AddItemToCartHandler,
    RemoveItemFromCart: RemoveItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
