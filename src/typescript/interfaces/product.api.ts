export type TProductSchema = {
  IProductObject: {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: TProductSchema["ICategory"];
    images: string[];
  };
  ICategory: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
  IProductResponse:TProductSchema['IProductObject'][]
};
