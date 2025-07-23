export const baseURL = import.meta.env.VITE_PUBLIC_BASE_URL;

export const endpoints = {
  product: {
    list: "/products", 
    details: (id: number) => `/products/${id}`,
  },
  categories:{
    list:'/categories'
  }
};


