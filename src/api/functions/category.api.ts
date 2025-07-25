import { type TCategorySchema } from "../../typescript/interfaces/category.interface"
import AxiosInstance from "../axios-instance/axiosInstance"
import { endpoints } from "../endpoints/endpoints"


export const getCategoryList=async()=>{
    const res=await AxiosInstance.get<TCategorySchema['IcategoryResponse']>(endpoints.categories.list)

    return res.data
}

