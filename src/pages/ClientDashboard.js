import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authLogout, isLoggedIn } from "../lib/cookieAuth";

const ClientDashboard = () => {
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

  return (
    <div className="container">
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>ClientDashboard</DashboardTitle>
        </DashboardHeader>
        <DashboardBody>
          <WelcomeMessage>Welcome, {user.name}!</WelcomeMessage>
          <AddPropertyLink to="/properties">
            View All Properties
          </AddPropertyLink>
        </DashboardBody>
      </DashboardContainer>
    </div>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?cs=srgb&dl=pexels-jessica-bryant-1370704.jpg&fm=jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 800px;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DashboardTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  margin-top: 10px;
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
  text-align: center;
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

export default ClientDashboard;
