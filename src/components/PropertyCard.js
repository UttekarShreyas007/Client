import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mark from "./Mark";
import localforage from "localforage";

const PropertyCard = ({ property, deleteFunction = "" }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("general");
  const [userId, setUserId] = useState('');

  useEffect(() => {
    localforage.getItem("userRole").then((res) => {
      setRole(res);
      localforage.getItem("userId").then((resp) => {
        setUserId(resp);
      });
    });
  }, [navigate]);

  // const userId = localStorage.getItem("userId");
  // const role = localStorage.getItem("userRole")|| "general";
 
  return (
    <div className="property-card">
      {role === "client" && userId !== '' &&(
        <Mark
          mark={property.interestedUsers.includes(userId)}
          
          propertyId={property._id}
        />
      )}
      <div className="property-image">
        <img
          src={property.image}
          alt={property.title}
          className="property-image"
        />
      </div>
      <div className="property-details">
        <span className="property-title">{property.title}</span>
        <p className="property-address">{property.description}</p>
        <p className="property-price">Price: ${property.price}</p>
        <div>
          <Link to={`/propertiesDetails/${property._id}`} className="btn">
            View Details
          </Link>
          {role === "agent" && (
            <>
              <Link to={`/edit-property/${property._id}`} className="btn">
                Update
              </Link>
              <Link
                onClick={() => deleteFunction(property._id)}
                className="btn-delete"
              >
                Delete
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
