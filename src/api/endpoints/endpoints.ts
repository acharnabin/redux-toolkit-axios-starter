
export const baseURL="https://fakestoreapi.com"

export const endpoints={
    product:{
        list:'/products',
        details:(id:number)=>`/products/${id}`
    },

}