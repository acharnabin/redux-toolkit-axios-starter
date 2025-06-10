export const baseURL = "https://fakestoreapi.com";

export const endpoints = {
  product: {
    list: "/productsddddd", 
    details: (id: number) => `/products/${id}`,
  },
};


