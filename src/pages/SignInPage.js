import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import { SET_USER } from "../redux/actions/types";
import localforage from "localforage";
import { isLoggedIn } from "../lib/cookieAuth";

const SignInPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then((response) => {
        const userObject = response.data.userObj;
        const token = response.data.token;
        dispatch({ type: SET_USER, payload: userObject });

        localforage.setItem("token", token);
        localforage.setItem("userId", userObject._id);
        localforage.setItem("userRole", userObject.role);

        const userRole = userObject.role;
        if (userRole === "agent") {
          navigate("/agentDashboard");
        } else {
          navigate("/clientDashboard");
        }
      })
      .catch((err) => {
        setErrorMessage("Email or Password is Incorrect");
      });
  };

  return (
    <div className="login-form">
      <center>
        <h4>Log In!</h4>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <input
            required
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {errorMessage && <div className="error"> {errorMessage} </div>}
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignInPage;
