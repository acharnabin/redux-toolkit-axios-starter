// this is for zustand store

// yarn add zustand  zustand-x
import { createStore } from "zustand-x";
import type { TbusinessSchema } from "../pages/BusinessSetUp";

type TZustandStore = {
    name:string;
    submmission: TbusinessSchema[]
}

// jokon store banachi
// 1. createStore ( intial value dite hbe , option dite hbe -> store_name , persist true/false)\
// 2. store aer type dite hbe 
const zustandStore = createStore<TZustandStore>(
  // initial value
  {
    name: "initial name",
    submmission: [],
  },
  // set up for this store
  {
    name: "submission-store",
    persist: true,
  }
);

export default zustandStore;
