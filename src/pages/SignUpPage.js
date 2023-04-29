import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/authApi';
import validateSignupForm from '../utils/validateSignUpForm ';

const SignUpPage = () => {
  const history = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSignupForm(formValues);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      await signup(formValues);
      history('/login');
    } catch (error) {
      console.log(error);
      setFormErrors((prevState) => ({
        ...prevState,
        email: error.response.data.message,
      }
      ));
    }
  };

  return (
    <div >
      
      <form onSubmit={handleSubmit} className='signup-formdata'>
      <center><h4>Register with Us!</h4></center>
      <div className="form-group">
        <input
        required
          type='text'
          name='name'
          placeholder='Name'
          value={formValues.name}
          onChange={handleChange}
        />
        {formErrors.name && <div>{formErrors.name}</div>}
      </div>
      <div className="form-group">
        <input
        required
          type='email'
          name='email'
          placeholder='Email'
          value={formValues.email}
          onChange={handleChange}
        />
        {formErrors.email && <div>{formErrors.email}</div>}
        </div>
        <div className="form-group">
        <input
        required
          type='password'
          name='password'
          placeholder='Password'
          value={formValues.password}
          onChange={handleChange}
        />
        {formErrors.password && <div>{formErrors.password}</div>}
        </div>
        <div className="form-group">
        <input
        required
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          value={formValues.confirmPassword}
          onChange={handleChange}
        />
        {formErrors.confirmPassword && (
          <div>{formErrors.confirmPassword}</div>
        )}
    </div>
          <div className = 'submit-btn'>
        <button type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
