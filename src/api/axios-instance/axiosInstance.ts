import axios from "axios";
import { baseURL } from "../endpoints/endpoints";

const AxiosInstance = axios.create({
  baseURL: baseURL,
});

// request
// Private api -> send token to server
// public api
AxiosInstance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

// reponse
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    // alert(error.message)
    return Promise.reject(error);
  }
);

//
// axios.get('www.something.com/routes')
// axiosInstance.get('/routes')

export default AxiosInstance;
