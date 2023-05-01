import axios from "axios";
import localforage from "localforage";

const deleteApi = async (apiPath, reqObj) => {
  const token = await localforage.getItem("token");

  const response = await axios.delete(
    `${process.env.REACT_APP_API_URL}${apiPath}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      //AxiosRequestConfig parameter
      withCredentials: true, //correct
    }
  );
  return response;
};

export default deleteApi;
