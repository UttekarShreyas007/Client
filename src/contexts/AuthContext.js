import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setUser(res.data.user))
        .catch((err) => console.log(err));
    }
  }, []);

  const login = (email, password) => {
    return axios
      .post("/api/auth/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
      });
  };

  const signup = (name, email, password) => {
    return axios
      .post("/api/auth/signup", { name, email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const values = {
    user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Consumer value={values}>{value => (
    // Do something with the value of the context
    <div>{value}</div>
  )}</AuthContext.Consumer>;
};
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
