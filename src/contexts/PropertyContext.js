import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PropertyContext = createContext();

const PropertyContextProvider = (props) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/properties`)
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addProperty = (newProperty) => {
    axios.post(`${process.env.REACT_APP_API_URL}/properties`, newProperty)
      .then((response) => {
        setProperties([...properties, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProperty = (id, updatedProperty) => {
    axios.put(`${process.env.REACT_APP_API_URL}/properties/${id}`, updatedProperty)
      .then((response) => {
        const updatedProperties = properties.map((property) => {
          if (property._id === id) {
            return response.data;
          } else {
            return property;
          }
        });
        setProperties(updatedProperties);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProperty = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/properties/${id}`)
      .then((response) => {
        const updatedProperties = properties.filter((property) => property._id !== id);
        setProperties(updatedProperties);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty }}>
      {props.children}
    </PropertyContext.Provider>
  );
};

export default PropertyContextProvider;
