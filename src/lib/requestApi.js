import axios from "axios";
import localforage from "localforage";

const requestApi = async (apiPath) => {
  const token = await localforage.getItem("token");

  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}${apiPath}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true, //correct
    }
  );
  return response;
};

export default requestApi;
