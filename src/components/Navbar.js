import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authLogout, checkAuthentication } from "../lib/cookieAuth";
import styled from "styled-components";
import localforage from "localforage";


const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('general')
  useEffect(() => {
    localforage.getItem('userRole').then((res)=>{
      setRole(res)
    })
  }, [navigate])
  
  const handleLogout = () => {
    try {
      authLogout()
      navigate("/login");
    } catch(err) {

      console.log("Failed to log out", err);
    }
  };

  const auth = checkAuthentication();
  // const role = localStorage.getItem("userRole") || "general";
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
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/properties">
            Properties
          </Link>
        </li>
        {
          role === 'client' ? (
            <><li className="nav-item">
            <Link className="nav-link" to="/interested-properties">
            My Interested Properties
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/clientDashboard">
            Dashboard
            </Link>
          </li>
          </>
          ) : role === 'agent' ? (<><li className="nav-item">
          <Link className="nav-link" to="/my-properties">
          View My Properties
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/client-list">
          Interested Clients
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add-property">
          Add Property
          </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/agentDashboard">
            Dashboard
            </Link>
          </li>
        </>) : (<></>)
        }
        {auth ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </li>
          </>
        ) : (
          <DashboardLogout onClick={handleLogout}>Logout</DashboardLogout>
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
