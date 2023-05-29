import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authLogout, isLoggedIn } from "../lib/cookieAuth";
import styled from "styled-components";
import localforage from "localforage";
import menu from "../menu.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("general");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 856);
    };

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Set initial value based on window width
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    isLoggedIn().then((res) => {
      setLoggedIn(res);
    });
    localforage.getItem("userRole").then((res) => {
      setRole(res);
    });
  }, [navigate]);

  const handleLogout = () => {
    try {
      authLogout();
      toggleMenu()
      navigate("/login");
    } catch (err) {
      console.log("Failed to log out", err);
    }
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <img
            src="https://logos.textgiraffe.com/logos/logo-name/Rewa-designstyle-pastel-m.png"
            height={80}
            width={100}
            alt="logo"
          />
        </Link>
        <img
          onClick={toggleMenu}
          className="Ham-menu"
          src={menu}
          height={80}
          width={80}
          alt="menu"
        />
      </div>
      <ul className={!isOpen ? "navbar-nav": "navbar-nav slide"}>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/properties" onClick={toggleMenu}>
            Properties
          </Link>
        </li>
        {role === "client" ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/interested-properties" onClick={toggleMenu}>
                My Interested Properties
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/clientDashboard" onClick={toggleMenu}>
                Dashboard
              </Link>
            </li>
          </>
        ) : role === "agent" ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/my-properties" onClick={toggleMenu} >
                View My Properties
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/client-list" onClick={toggleMenu}>
                Interested Clients
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-property" onClick={toggleMenu}>
                Add Property
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/agentDashboard" onClick={toggleMenu}>
                Dashboard
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
        {loggedIn ? (
          <li className="nav-item">
          <button onClick={handleLogout} className="button-btn">Logout</button>
        </li>
          
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={toggleMenu}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup" onClick={toggleMenu}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

const DashboardLogout = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;
