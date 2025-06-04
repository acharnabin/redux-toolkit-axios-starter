import axios from "axios";
import { baseURL } from "../endpoints/endpoints";

const AxiosInstance=axios.create({
    baseURL:baseURL
})


export default AxiosInstance