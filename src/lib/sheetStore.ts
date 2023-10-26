import { useState } from "react";
import { create, useStore } from "zustand";
import { getAlpha, defaultRowHeight, defaultColumnWidth} from "./util";


export type Row = {
  h: number,
  ref: number,
}

export type Column = {
  w: number,
  ref: string
}

interface SheetLayoutState {
  rows: Row[],
  columns: Column[],
  resizeColumn: (ref: string, dw: number)=>void
  resizeRow: (ref: number, dh: number)=>void
}

export const sheetLayoutStore = create<SheetLayoutState>()(
  (set)=>({
    rows: Array(20).fill(0).map((_,i)=>({h: defaultRowHeight, ref: i+1})),
    columns: Array(20).fill(0).map((_,i)=>({w: defaultColumnWidth, ref: getAlpha(i)})),
    resizeColumn: (ref, dw) => set((state)=>{
      let columnIndex = state.columns.findIndex(v=>v.ref == ref);
      if(columnIndex>=0){
        let column = { ...state.columns[columnIndex], w: state.columns[columnIndex].w+dw }
        state.columns[columnIndex] = column
        state= {...state, columns: [...state.columns]}
      }
      return state
    }),

    resizeRow: (ref, dh) => set((state)=>{
      let rowIndex = state.rows.findIndex(v=>v.ref == ref);
      if(rowIndex>=0){
        let row = { ...state.rows[rowIndex], h: state.rows[rowIndex].h+dh }
        state.rows[rowIndex] = row
        state = {...state, rows: [...state.rows]}
      }
      return state
    })
  })
)

export function getRefs(columnref: string, rowref: number){
  let [column, row] = sheetLayoutStore(state=>[
    state.columns.find(c=>c.ref == columnref),
    state.rows.find(r=>r.ref == rowref )
  ]);
  return [column, row] as [Column, Row];
}


