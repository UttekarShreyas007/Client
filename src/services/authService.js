import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
  
  
  login(email, password) {
    
   return axios
      .post(API_URL + "login", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        email, password


      },{ withCredentials: true}  )
    
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

export default new AuthService();
