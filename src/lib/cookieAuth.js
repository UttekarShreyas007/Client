import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { logout } from "../redux/actions/authActions";
import localforage from "localforage";

export const checkAuthentication = () => {
  const token = Cookies.get("token");
  if (token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (!decodedToken.exp > currentTime) {
     return true;
    }else{
        return false;
    }
  } else {
    return true;
  }
};
export const authLogout = () =>{
  // localStorage.clear();
  localforage.clear();
  Cookies.remove('token')
  logout()
}