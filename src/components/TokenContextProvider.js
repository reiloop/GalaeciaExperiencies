import React, { useState } from "react";

const TokenContext = React.createContext();

const TokenContextProvider = (props) => {
  const [token, setToken] = useState("");
  return (
    <TokenContext.Provider value={[token, setToken]}>
      {props.children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenContextProvider };
