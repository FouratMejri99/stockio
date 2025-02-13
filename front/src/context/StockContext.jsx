// src/context/StockContext.jsx
import React, { createContext, useState } from "react";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (stock) => {
    setWatchlist([...watchlist, stock]);
  };

  return (
    <StockContext.Provider value={{ watchlist, addToWatchlist }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockContext;
