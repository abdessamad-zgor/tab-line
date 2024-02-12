import { create } from "zustand";
import { toNumber } from "../util";

export interface SheetData {
  data: {[ref: string]: number|string},
  updateCell: (ref: string,value: number|string)=>void
}


export const dataStore = create<SheetData>()((set)=>({
  data: {},
  updateCell: (ref: string, value: number|string)=>{
    set((state)=>{
      console.log(state.data);
      state.data[ref] = value;
      return {...state, data: {...state.data}};
    });
  }
}));



