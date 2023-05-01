import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterestedProperties } from "../services/propertyService";
import PropertyList from "../components/PropertyList";
import styled from "styled-components";
import { GET_PROPERTIES } from "../redux/actions/types";
import { useNavigate } from "react-router-dom";
import { authLogout, isLoggedIn } from "../lib/cookieAuth";

const Title = styled.h1`
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;

const ClientInterestPage = () => {
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
  const dispatch = useDispatch();
  const { properties, loading } = useSelector((state) => state.property);

  useEffect(() => {
    fetchInterestedProperties().then((res) => {
      dispatch({ type: GET_PROPERTIES, payload: res });
    });
  }, [dispatch]);

  return (
    <div className="container">
      <Title>Properties You Have Shown Interest In</Title>
      {loading ? <p>Loading...</p> : <PropertyList properties={properties} />}
    </div>
  );
};

export default ClientInterestPage;
