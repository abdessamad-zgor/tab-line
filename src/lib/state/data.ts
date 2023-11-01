import { create } from "zustand";
import { initSheet, CellReference, toNumber, defaultRowsNumber, defaultColumnsNumber } from "../util";

/**
 * represents the data of the sheet
 */
export interface SheetData {
  data: {value: number|string}[][],
  updateCell: (cellref: CellReference, value: number|string)=>void
}

export const dataStore = create<SheetData>()((set)=>({
  data: initSheet(defaultRowsNumber, defaultColumnsNumber),
  updateCell: (cellref: CellReference, value: number|string)=>set((state)=>{
    state.data[cellref.rowref-1][toNumber(cellref.columnref)] = {value};
    return {...state, data: [...state.data]};
  }),
}));


export function getCellValue(cellref: CellReference|null) {
  return dataStore(state=>cellref?state.data[cellref.rowref-1][toNumber(cellref.columnref)]:{value:""}); 
}

