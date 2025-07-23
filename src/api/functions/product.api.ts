import { type TProductResponse } from "../../typescript/interfaces/product.api";
import AxiosInstance from "../axios-instance/axiosInstance"
import { endpoints } from "../endpoints/endpoints"

export const fetchproductList=async ({
    title,
    categoryId
}:{
    title:string,
    categoryId?:number
})=>{
    const res=await AxiosInstance.get<TProductResponse>(endpoints.product.list,{
        params:{
            title,categoryId
        }
    });
    return res.data
}