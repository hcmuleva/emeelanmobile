import { useOne } from "@refinedev/core";
import React, { createContext } from "react";

const defaultValue = {};
const GlobalContext = createContext(defaultValue);
const GlobalProvider = ({ children }) => {
  const value = null;
  const {data, isLoading} = useOne({

  })
  return (
    <GlobalContext.Provider value={{ value }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
