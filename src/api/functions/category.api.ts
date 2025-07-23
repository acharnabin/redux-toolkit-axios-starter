import AxiosInstance from "../axios-instance/axiosInstance"
import { endpoints } from "../endpoints/endpoints"


export const getCategoryList=async()=>{
    const res=await AxiosInstance.get(endpoints.categories.list)

    return res.data
}

