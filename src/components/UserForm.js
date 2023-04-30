import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ updateUser, setEditing, user }) => {
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (user) {
        await axios.put(`${process.env.REACT_APP_API_URL}/users/${user._id}`, formData);
        updateUser({ ...formData, _id: user._id });
        setEditing(false);
      } else {
        await axios.post('${process.env.REACT_APP_API_URL}/users', formData);
        setFormData({
          name: '',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={!user}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {user ? 'Update' : 'Create'}
      </button>
      {user && (
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default UserForm;
