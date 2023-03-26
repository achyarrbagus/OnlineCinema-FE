import { createContext, useContext, useState } from "react";

export const ContextGlobal = createContext();

export const ContextProvider = (props) => {
  let kumpulanState = {};

  return <ContextGlobal.Provider value={{ kumpulanState }}>{props.children}</ContextGlobal.Provider>;
};
