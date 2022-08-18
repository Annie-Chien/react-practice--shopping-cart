import React, { useContext } from 'react';
import { GoTrashcan } from 'react-icons/go';
import { cartContext } from './ContextProvider';

const Basket = () => {
  const ctx = useContext(cartContext);

  return (
    <div className="basket">
      <h2>Your cart</h2>
      <div className="basket-items">
        {ctx.items.map((item, index) => {
          return (
            <div className="item" key={index}>
              <div className="item-info">
                <h3 className="title">{item.title}</h3>
                <button onClick={() => ctx.remove(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => ctx.add(item)}>+</button>
                <button className="remove-icon" onClick={() => ctx.del(item)}>
                  <GoTrashcan />
                </button>
                <span className="price">${item.price}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="total">
        <p>Total: ${ctx.total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Basket;
