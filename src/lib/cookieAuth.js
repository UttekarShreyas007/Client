import jwt_decode from "jwt-decode";
import { logout } from "../redux/actions/authActions";
import localforage from "localforage";

export const isLoggedIn = async () => {
  const token = await localforage.getItem("token");
  if (token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (!decodedToken.exp > currentTime) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
export const authLogout = () => {
  localforage.clear();
  logout();
};
