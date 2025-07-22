// this is for zustand store

// yarn add zustand  zustand-x
import { createStore } from "zustand-x";
import type { TbusinessSchema } from "../pages/BusinessSetUp";

type TZustandStore = {
  name: string;
  submmission: TbusinessSchema[];
  first_name: string;
  last_name: string;
};

const intitialState: TZustandStore = {
  name: "initial name",
  first_name: "nabin",
  last_name: "achar",
  submmission: [],
};

// jokon store banachi
// 1. createStore ( intial value dite hbe , option dite hbe -> store_name , persist true/false)\
// 2. store aer type dite hbe
const zustandStore = createStore<TZustandStore>(
  // initial value
  intitialState,
  // set up for this store
  {
    name: "submission-store",
    persist: true,
    immer: true,
  }
)
  .extendActions((actions) => ({
    // new action gulo akane amra add korbo
    setName: (payload: string) => actions.set("name", payload),

    // reset korar jonne function
    // puro state ta reset hye jbe

    resetStore: () => {
      actions.set("state", (state) => {
        state.name = "";
        state.submmission = [];

        return state;
      });
    },

    // reset
    reset: () => {
      actions.set("state", intitialState);
    },
  }))
  .extendSelectors((actions) => ({
    fullName: () => {
      return actions.get("first_name") + " " + actions.get("last_name");
    },
  }));

export default zustandStore;

// Redux 
// 1. single store create korte hy 
// 2. slice multiple crete korte hy
// 3. redux aer hooks use korar jonne provider must
// 4. presist external libray add korte hoto
// 5. createAsyncthunk ache 

// context 
// 1. muliple context toiri korte pari
// 2. context  use korar jonne provider must


// zustand
// 1. Multiple store 
// 2. kono provider lgbe na
// 3. persist inbuilt
// 4. typescript support ache 
// 5. create async thunk aer support nei


