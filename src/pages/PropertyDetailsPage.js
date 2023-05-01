import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import requestApi from "../lib/requestApi";
import Map from "../components/Map";
import { authLogout, isLoggedIn } from "../lib/cookieAuth";

const PropertyDetailsPage = () => {
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
  const { id } = useParams();
  const [property, setProperty] = useState({});

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await requestApi(`/properties/${id}`);
        setProperty(response.data.property);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperty();
  }, [id]);

  return (
    <div>
      <h1>Property Details</h1>
      <div className="property-card">
        <div className="property-image">
          <img
            src={property.image}
            alt={property.title}
            className="property-image"
          />
        </div>
        <div className="property-details">
          <span className="property-title">{property.title}</span>
          <p className="property-address">
            Description: {property.description}
          </p>
          <p className="property-address">Type: {property.type}</p>
          <p className="property-address">Location: {property.location}</p>
          <p className="property-address">Address: {property.address}</p>
          <p className="property-price">Price: ${property.price}</p>
          <Map address={property.address} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
