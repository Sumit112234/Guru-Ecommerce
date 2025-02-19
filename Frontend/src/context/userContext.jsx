import React, { createContext, useContext, useState } from "react";

// Create the AuthContext
const UserContext = createContext();

// AuthProvider component
export const UserProvider = ({ children }) => {
  
    const [darkTheme,setDarkTheme] = useState(true);
    const [user,setUser] = useState(null);

  const value = {
    user ,    
    setUser,
    darkTheme,
    setDarkTheme
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
