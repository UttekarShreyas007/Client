import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import requestApi from "../lib/requestApi";
import deleteApi from "../lib/deleteApi";
import { useNavigate } from "react-router-dom";
import { authLogout, isLoggedIn } from "../lib/cookieAuth";
import localforage from "localforage";

const AgentProperties = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(() => {
    localforage.getItem("userId").then((resp) => {
      requestApi(`/properties/agent/${resp}`).then((res) => {
        setProperties(res.data);
      });
    });
  }, []);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProperties = properties.filter((property) => {
    return (
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.price
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });
  const handlePropertyDelete = (propertyId) => {
    deleteApi(`/properties/${propertyId}`).then((res) => {
      setProperties(
        properties.filter((property) => property._id !== propertyId)
      );
    });
  };

  return (
    <div className="container">
      <div className="searchbar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search properties..."
        />
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            deleteFunction={handlePropertyDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentProperties;
