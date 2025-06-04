import AxiosInstance from "../axios-instance/axiosInstance"
import { endpoints } from "../endpoints/endpoints"

export const fetchproductList=async (data:{
    name:string;
    email:string
})=>{
    const res=await AxiosInstance.get(endpoints.product.list);
    return res.data
}