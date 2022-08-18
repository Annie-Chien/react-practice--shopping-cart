import React, { useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { cartContext } from './ContextProvider';
const Header = ({ onClick }) => {
  const ctx = useContext(cartContext);
  const cartQty = ctx.items
    .map((item) => item.qty)
    .reduce((prev, cur) => prev + cur, 0);
  return (
    <header className="header">
      <h1>Shopping cart</h1>
      <div className="cart" onClick={onClick}>
        <AiOutlineShoppingCart className="icon" />
        <span className="label">{cartQty}</span>
      </div>
    </header>
  );
};

export default Header;
