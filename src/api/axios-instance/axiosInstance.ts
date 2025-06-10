import axios from "axios";
import { baseURL } from "../endpoints/endpoints";

const AxiosInstance = axios.create({
  baseURL: baseURL,
});

// request
// Private api -> send token to server
// public api
AxiosInstance.interceptors.request.use(
  (confing) => {
    const token = localStorage.getItem("token");

    if (token) {
      confing.headers["Authorization"] = token;
    }

    return confing;
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
