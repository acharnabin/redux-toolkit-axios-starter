import { type TProductResponse } from "../../typescript/interfaces/product.api";
import AxiosInstance from "../axios-instance/axiosInstance"
import { endpoints } from "../endpoints/endpoints"

export const fetchproductList=async ()=>{
    const res=await AxiosInstance.get<TProductResponse>(endpoints.product.list);
    return res.data
}