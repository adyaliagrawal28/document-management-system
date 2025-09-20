import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    
    return localStorage.getItem("authToken") || null;
  });

  const login = (newToken) => {
    if (!newToken) return; // don’t allow undefined token
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
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
