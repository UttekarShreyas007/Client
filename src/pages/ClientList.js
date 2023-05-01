// components/ClientsList.js

import React, { useState, useEffect } from "react";
import requestApi from "../lib/requestApi";
import { useNavigate } from "react-router-dom";
import { authLogout, isLoggedIn } from "../lib/cookieAuth";
import localforage from "localforage";

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    localforage.getItem("userRole").then((resp) => {
      if (resp !== "agent") {
        navigate("/");
      }
    });
  }, [navigate]);
  useEffect(() => {
    const interval = setInterval(() => {
      isLoggedIn().then((res) => {
        if (!res) {
          authLogout();
          navigate("/login");
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    requestApi(`/properties/clients`).then((res) => {
      setClients(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Clients List</h1>
      <table>
        <thead>
          <tr>
            <th>Property Title</th>
            <th>Client Name</th>
            <th>Client Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.property}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;
