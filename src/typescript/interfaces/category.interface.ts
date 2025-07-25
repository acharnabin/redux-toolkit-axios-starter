
export type TCategorySchema={
   Icategory:{
     id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
   },
   IcategoryResponse:TCategorySchema['Icategory'][]
}