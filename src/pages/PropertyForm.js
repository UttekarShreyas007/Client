import React, { useEffect, useState } from "react";
import postApi from "../lib/postApi";
import { useNavigate, useParams } from "react-router-dom";
import requestApi from "../lib/requestApi";
import updateApi from "../lib/updateApi";
import { authLogout, isLoggedIn } from "../lib/cookieAuth";
import localforage from "localforage";
import validateForm from "../utils/formValidations";

const PropertyForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localforage.getItem("userRole").then((resp) => {
      if (resp !== "agent") {
        navigate("/");
      }
    });
  }, [navigate]);

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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    address: "",
    price: "",
    location: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id !== undefined) {
      const fetchProperty = async () => {
        try {
          const response = await requestApi(`/properties/${id}`);
          setFormData({
            title: response.data.property.title,
            description: response.data.property.description,
            address: response.data.property.address,
            location: response.data.property.location,
            type: response.data.property.type,
            price: response.data.property.price,
            image: response.data.property.image,
          });
        } catch (error) {
          console.error(error);
        }
      };
      fetchProperty();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      // submit form data to server
    } else {
      setErrors(validationErrors);
    }
    try {
      postApi("/properties/create", formData).then((res) => {
        navigate("/properties");
        alert("Property added successfully!");
        setFormData({
          title: "",
          description: "",
          type: "",
          address: "",
          price: "",
          location: "",
          image: "",
        });
      });
    } catch (err) {
      alert("Error occurred, please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      updateApi(`/properties/${id}`, formData).then((res) => {
        navigate("/my-properties");
        alert("Property updated successfully!");
        setFormData({
          title: "",
          description: "",
          type: "",
          address: "",
          price: "",
          location: "",
          image: "",
        });
      });
    } catch (err) {
      alert("Error occurred, please try again.");
    }
  };

  return (
    <div className="property-form">
      {id === undefined ? <h4>Add New Property</h4> : <h4>Update Property</h4>}
      <form onSubmit={id === undefined ? handleSubmit : handleUpdate}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter a title"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter a Description"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter an address"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter the type of property"
            className="form-control"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
          {errors.type && <span className="error">{errors.type}</span>}
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter the price"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter the location"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter property image url"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
        {id === undefined ? (
          <button type="submit" className="submit-btn">
            Add Property
          </button>
        ) : (
          <button type="submit" className="submit-btn">
            Update Property
          </button>
        )}
      </form>
    </div>
  );
};

export default PropertyForm;
