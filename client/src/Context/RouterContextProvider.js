import React, { useState, createContext } from "react";

export const RouterContext = createContext();
function RouterContextProvider({ children }) {
  const [value, setValue] = useState({ value: "Home" });
  return (
    <RouterContext.Provider value={{ value, setValue }}>
      {children}
    </RouterContext.Provider>
  );
}

export default RouterContextProvider;
