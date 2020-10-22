import React, { useState, createContext } from "react";

export const ModalContext = createContext();
function ModalContextProvider({ children }) {
  const [value, setValue] = useState({ value: "" });
  return (
    <ModalContext.Provider value={{ value, setValue }}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContextProvider;
