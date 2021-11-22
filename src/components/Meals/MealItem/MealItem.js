import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const cartContext = useContext(CartContext);
  const addToCartHandler = amount => {
    const newCartItem = {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount
    }
    cartContext.AddItemToCart(newCartItem);
  };

  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
    <div>
      <div>
        <h3>{props.name}</h3>
      </div>
      <div className={classes.description}>{props.description}</div>
      <div className={classes.price}>{price}</div>
    </div>
    <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
  </li>
  )
};

export default MealItem;
