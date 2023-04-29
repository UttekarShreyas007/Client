import React from "react";
import PropertyCard from "./PropertyCard";

const PropertyList = ({ properties }) => {
  const renderProperties = () => {
    return properties.map((property) => {
      return (
        <div>
          <PropertyCard key={property._id} property={property} />
        </div>
      );
    });
  };

  return <div>{renderProperties()}</div>;
};

export default PropertyList;
