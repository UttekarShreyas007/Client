import authService from "../../services/authService";
import { LOGOUT, RESET_PROPERTIES } from "./types";

// Login action
export const login = async (email, password) => {
  try {
    const response = await authService.login(email, password);
    return response;
  } catch (error) {
    if (error.request.status === 401) {
      throw JSON.stringify({
        error: "Email or Password Incorrect",
        status: 401,
      });
    }
  }
};

// Logout action
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: RESET_PROPERTIES });
};
