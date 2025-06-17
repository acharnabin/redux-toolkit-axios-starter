
export type TProductResponse=IProductObj[]

export interface IProductObj {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRating;
}
interface IRating {
  rate: number;
  count: number;
}