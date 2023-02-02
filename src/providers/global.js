//https://github.com/Henriquecesp/react-context
import React, { useState } from "react";

export const GlobalContext = React.createContext({});


export const GlobalProvider = (props) => {
  const [login, setLogin] = useState(false);
  const [cadastro, setCadastro] = useState(false);

  return (
    <GlobalContext.Provider value={{ login, setLogin, cadastro, setCadastro }}>
      {props.children}
    </GlobalContext.Provider>
  );
};


export const useGlobal = () => React.useContext(GlobalProvider);