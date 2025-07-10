import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("guest");
  const [username, setUsername] = useState("");

  // Check for author session in localStorage
  useEffect(() => {
    const authorLoggedIn = localStorage.getItem("authorLoggedIn");
    if (authorLoggedIn === "true") {
      setUser({ username: "admin" });
      setUserRole("author");
      setUsername("admin");
    } else {
      setUser(null);
      setUserRole("guest");
      setUsername("");
    }
  }, []);

  // Login function for header
  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("authorLoggedIn", "true");
      setUser({ username: "admin" });
      setUserRole("author");
      setUsername("admin");
      return true;
    }
    return false;
  };

  // Logout function
  const signOut = async () => {
    setLoading(true);
    localStorage.removeItem("authorLoggedIn");
    setUser(null);
    setUserRole("guest");
    setUsername("");
    setLoading(false);
  };

  const isAuthor = userRole === "author";

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthor, signOut, username, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
