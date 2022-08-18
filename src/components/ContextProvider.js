import React, { useReducer } from 'react';

export const cartContext = React.createContext();

const defaultValue = {
  items: [],
  total: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const newTotal = state.total + action.item.price * action.item.qty;
      const existing = state.items.find((item) => item.id === action.item.id);
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      if (existing) {
        const updatedItem = { ...existing, qty: existing.qty + 1 };

        //
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = updatedItem;
        //
        return {
          // items: [...state.items, updatedItem],
          items: updatedItems,
          total: newTotal,
        };
      }

      return {
        items: [...state.items, action.item],
        total: newTotal,
      };
    }
    case 'REMOVE': {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existing = state.items[existingIndex];
      const newTotal = state.total - existing.price;
      let updatedItems;
      if (existing.qty === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = { ...existing, qty: existing.qty - 1 };
        updatedItems = [...state.items];
        updatedItems[existingIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        total: newTotal,
      };
    }
    case 'DEL': {
      const newTotal = state.total - action.item.price * action.item.qty;
      const updatedItems = state.items.filter(
        (item) => action.item.id !== item.id
      );
      return {
        items: updatedItems,
        total: newTotal,
      };
    }
  }
};

const ContextProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(reducer, defaultValue);

  const addItemsHandler = (item) => {
    dispatchCart({ type: 'ADD', item: item });
  };
  const removeItemsHandler = (id) => {
    dispatchCart({ type: 'REMOVE', id: id });
  };
  const deleteItemHandler = (item) => {
    dispatchCart({ type: 'DEL', item: item });
  };
  const cartItems = {
    items: cartState.items,
    total: cartState.total,
    add: addItemsHandler,
    remove: removeItemsHandler,
    del: deleteItemHandler,
  };

  return (
    <cartContext.Provider value={cartItems}>
      {props.children}
    </cartContext.Provider>
  );
};

export default ContextProvider;
