import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    
    return localStorage.getItem("authToken") || null;
  });

  const login = (newToken) => {
    
    const tokenToUse = newToken || "mock-token-for-testing";
    setToken(tokenToUse);
    localStorage.setItem("authToken", tokenToUse);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
