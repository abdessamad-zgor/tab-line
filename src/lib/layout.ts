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
  fontSize: string,
  fontFamily: string,
  backgroundColor: string,
  color: string,
  fontWeight: string,
  fontStyle: "normal"|"italic",
  borderWidth: string,
  borderColor: string,
  borderStyle: string,
}

interface Layout {
  rows: any[],
  columns: any[],
  selectedCell: string|null,
  styles: {[ref: string]: CellStyle},
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
  styles: {},
  resizeRow: (row: number, dh: number)=>{
    set((state)=>(
      {
        ...state,
        rows: state.rows.map(r => r.ref==row ? {...r, h: r.h+dh} : r)}
    ))
  },
  resizeColumn: (column: string, dw: number)=>{
    set((state)=>(
      {
        ...state,
        columns: state.columns.map(
          c => c.ref==column ? 
          {...c, w: c.w+dw} : c)
      }
    ))
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
    set((state)=>({...state, selectedCell: ref})),
  setStyles: (ref: string, styles: Partial<CellStyles>)=>{
    set(state=>({...state, styles: {...state.styles, [ref]: {...(state.styles[ref]||{}), ...styles}}}))
  }
}))
