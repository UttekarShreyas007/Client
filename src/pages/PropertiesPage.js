import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import requestApi from "../lib/requestApi";
import loader from "../loader.gif";
const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    requestApi("/properties")
      .then((res) => {
        setProperties(res.data.properties);
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false when properties are loaded
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
      property.price.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container">
      <div className="searchbar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search properties..."
        />
        {isLoading ? (
          // Render the loader while properties are loading
          <div className="loader">
          <img
            src={loader}
            alt="Loading"
            style={{
              height: "100px",
              width: "100px",
              position: "absolute",
              top: "30%",
              right: "47%",
            }}
          />
        </div>
        ) : (
          // Render the property cards when properties are loaded
          filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
