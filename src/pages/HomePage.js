import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/properties");
  };
  return (
    <div className="home">
      <div className="text">
      <h1>Welcome to REWA</h1>
      <h6>
        Welcome to REWA, your go-to source for all things related to buying,
        selling, and renting properties. Whether you're a first-time homebuyer,
        a seasoned investor, or a landlord looking to list your property, we've
        got you covered.
      </h6>
      <h6>
        With our comprehensive database of properties, intuitive search filters,
        and expert agents, finding your dream home has never been easier. From
        luxurious apartments to cozy cottages, we offer a wide range of listings
        to suit every budget and preference.
      </h6>
      <h6>
        At Real Estate, we pride ourselves on providing exceptional customer
        service and personalized attention to each and every client. Our team of
        experienced professionals is dedicated to helping you navigate the
        complex world of real estate with ease and confidence.
      </h6>
      <button className="button" onClick={handleClick}>
        View All Properties
      </button>
      </div>
    </div>
  );
}

export default HomePage;
