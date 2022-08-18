import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Products from './components/Products';
import Basket from './components/Basket';
import Loading from './components/Loading';
import ContextProvider from './components/ContextProvider';
const url = 'https://fakestoreapi.com/products?limit=10';
const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

  const fetchData = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setProducts(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <Loading />;
  }

  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  return (
    <ContextProvider>
      <Header onClick={handleShowCart} />
      <div className="main">
        <Products data={products} />
        {showCart && <Basket />}
      </div>
    </ContextProvider>
  );
};

export default App;
