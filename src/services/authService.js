import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/auth/`;

class AuthService {
  
login(email, password) {
    return axios.post(
      API_URL + "login",
      {
        email,
        password,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Expose-Headers': '*',
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  }
  
  
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
