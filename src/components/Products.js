import React, { useState, useContext } from 'react';
// import { BiPlus, BiMinus } from 'react-icons/bi';
import { cartContext } from './ContextProvider';

const Products = ({ data }) => {
  const ctx = useContext(cartContext);
  const categories = [
    'all',
    ...new Set(data.map((product) => product.category)),
  ];

  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = (e) => {
    if (e.target.innerText.toLowerCase() === 'all') {
      return setFilteredData(data);
    }

    setFilteredData(
      data.filter((product) => {
        return product.category === e.target.innerText.toLowerCase();
      })
    );
  };
  const addItemHandler = (item) => {
    ctx.add({ ...item, qty: 1 });
  };

  return (
    <div className="product-list">
      <div className="filter-btns">
        {categories.map((c, i) => (
          <button className="filter-btn" key={i} onClick={handleFilter}>
            {c}
          </button>
        ))}
      </div>

      {filteredData.map((product) => {
        const { category, id, image, price, title } = product;
        return (
          <div key={id} className="product">
            <div className="img-container">
              <img src={image} alt={title} />
            </div>

            <div className="product-info">
              <span>{category}</span>
              <h2>{title}</h2>
              <p>$ {price}</p>
              <button
                className="addToCart"
                onClick={() => {
                  addItemHandler(product);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
