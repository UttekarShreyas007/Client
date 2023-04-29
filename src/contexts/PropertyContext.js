import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PropertyContext = createContext();

const PropertyContextProvider = (props) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addProperty = (newProperty) => {
    axios.post('http://localhost:5000/api/properties', newProperty)
      .then((response) => {
        setProperties([...properties, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProperty = (id, updatedProperty) => {
    axios.put(`http://localhost:5000/api/properties/${id}`, updatedProperty)
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
    axios.delete(`http://localhost:5000/api/properties/${id}`)
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
