// this is for zustand store

import { createStore } from "zustand-x";


type TCounterStore = {
   count:number;
   count2:number
}

const counterStore = createStore<TCounterStore>(
  // initial value
  {
   count:0,
   count2:0
  },
  // set up for this store
  {
    name: "counter-store",
    persist: true,
  }
);

export default counterStore;
