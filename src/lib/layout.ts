import { create } from "zustand";
import { getAlpha, toNumber } from "./util";

export type Row = {
  ref: string,
  h: number
}

export type Column = {
  ref: string,
  w: number
}

export type CellStyle = {
  fontSize: number,
  fontFamily: string,
  backgroundColor: string,
  color: string,
  fontStyle: "normal"|"italic"|"bold",
  border: {
    strokeWidth: number,
    color: string,
    strokeStyle: string
  }
}

interface Layout {
  rows: any[],
  columns: any[],
  selectedCell: string|null,
  grid: {[ref: string]: CellStyle},
  resizeRow: (row: number, dh: number)=>void,
  resizeColumn: (column: string, dw: number)=>void,
  addColumn: (col: string, position: 1|-1)=>void,
  removeColumn: (col: string)=>void
  addRow: (row: number, position: 1|-1)=>void,
  removeRow: (row: number)=>void,
  selectCell: (ref: string)=>void
}

export const layoutStore = create<Layout>()((set)=>({
  rows: Array(20).fill(0).map((r, ri)=>({ref: ri+1, h: 35})),
  columns: Array(16).fill(0).map((c, ci)=>({ref: getAlpha(ci), w: 100})),
  selectedCell: null,
  grid: {},
  resizeRow: (row: number, dh: number)=>{
    set((state)=>{
      state.rows[row-1] = {...state.rows[row-1], h: state.rows[row-1].h + dh};
      return {...state, rows: [...state.rows]}
    })
  },
  resizeColumn: (column: string, dw: number)=>{
    set((state)=>{
      let columnNum = toNumber(column)
      state.columns[columnNum] = {...state.columns[columnNum], w: state.columns[columnNum].w + dw};
      return {...state, columns: [...state.columns]}
    })
  },
  addColumn: (col: string, position: 1|-1)=>{
  },
  removeColumn: (col: string)=>{
  },
  addRow: (row: number, position: 1|-1)=>{
  },
  removeRow: (row: number)=>{
  },
  selectCell: (ref: string)=>
    set((state)=>({...state, selectedCell: ref}))
}))
