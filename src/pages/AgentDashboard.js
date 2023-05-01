import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropertyForm from "./PropertyForm";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import { authLogout, isLoggedIn } from "../lib/cookieAuth";
const AgentDashboard = () => {
  const navigate = useNavigate();
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
  const user = useSelector((state) => state.auth.user);
  const [formVisible, setFormVisible] = useState(false);
  const [properties, setProperties] = useState([]);

  const handlePropertyCreate = async (propertyData) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/properties`,
      propertyData
    );
    setProperties(response.data.properties);
    setFormVisible(false);
  };

  return (
    <div className="container">
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>Agent Dashboard</DashboardTitle>
        </DashboardHeader>
        <DashboardBody>
          <WelcomeMessage>Welcome, {user && user.name}!</WelcomeMessage>
          <AddPropertyLink to="/properties">
            View All Properties
          </AddPropertyLink>
          {formVisible && <PropertyForm onSubmit={handlePropertyCreate} />}
          {properties.length > 0 && (
            <>
              <h1>Your properties:</h1>
              <div className="property-card-container">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            </>
          )}
        </DashboardBody>
      </DashboardContainer>
    </div>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 50px;
  background-color: #f0f0f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DashboardTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  width: 100%;
`;

const DashboardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  display: flex;
  margin: 100px;
`;

const WelcomeMessage = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const AddPropertyLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 10px;
`;

export default AgentDashboard;
