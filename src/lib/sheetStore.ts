import { create } from "zustand";
import { getAlpha, defaultRowHeight, defaultColumnWidth, defaultRowsNumber, defaultColumnsNumber, initSheet, toNumber} from "./util";

export type Row = {
  h: number, // height of the row
  ref: number, // reference to the row
}

export type Column = {
  w: number, // width of the column
  ref: string // reference to the column
}

/**
 * Represents a cell
 *
 * @property {string} columnref - the column ref of the cell
 * @property {number} rowref - the row ref of the cell
 * */
export type Cell = {
  columnref: string,
  rowref: number
  value: string|number
}

export type CellRefrence = Omit<Cell, "value">

interface SheetLayoutState {
  rows: Row[],
  columns: Column[],
  currentCell: CellRefrence | null,
  resizeColumn: (ref: string, dw: number)=>void,
  resizeRow: (ref: number, dh: number)=>void,
  selectCell: (cell: CellRefrence | null)=>void
}

export const sheetLayoutStore = create<SheetLayoutState>()(
  (set)=>({
    // the rows in the sheet
    rows: Array(defaultRowsNumber).fill(0).map((_,i)=>({h: defaultRowHeight, ref: i+1})),
    // the columns in the sheet
    columns: Array(defaultColumnsNumber).fill(0).map((_,i)=>({w: defaultColumnWidth, ref: getAlpha(i)})),
    currentCell: null,
    /**
     * resizeColumn - resize a the width on a column
     *
     * @param ref: refrence to column
     * @param dh: width to add to column
     */
    resizeColumn: (ref, dw) => set((state)=>{
      let columnIndex = state.columns.findIndex(v=>v.ref == ref);
      if(columnIndex>=0){
        let column = { ...state.columns[columnIndex], w: state.columns[columnIndex].w+dw }
        state.columns[columnIndex] = column
        state= {...state, columns: [...state.columns]}
      }
      return state
    }),
    /**
     * resizeRow - resize a the height on a row
     *
     * @param ref: refrence to row
     * @param dh: height to add to row 
     */
    resizeRow: (ref, dh) => set((state)=>{
      let rowIndex = state.rows.findIndex(v=>v.ref == ref);
      if(rowIndex>=0){
        let row = { ...state.rows[rowIndex], h: state.rows[rowIndex].h+dh }
        state.rows[rowIndex] = row
        state = {...state, rows: [...state.rows]}
      }
      return state
    }),
    selectCell: (cell :CellRefrence|null)=>set((state)=>({
      ...state, currentCell: cell
    }))
  })
);

/**
 * represents the data of the sheet
 */

export interface SheetData {
  data: {value: number|string}[][],
  updateCell: (cellref: CellRefrence, value: number|string )=>void
}

export const sheetDataStore = create<SheetData>()((set)=>({
  data: initSheet(defaultRowsNumber, defaultColumnsNumber),
  updateCell: (cellref: CellRefrence, value: number|string)=>set((state)=>{
    state.data[cellref.rowref-1][toNumber(cellref.columnref)] = {value};
    return {...state, data: [...state.data]};
  }),
}));

/**
 *
 * getRefs - a hook to get the column and row from the references of a cell
 * 
 * @param {string} columnref - a reference to the column of a cell
 * @param {number} rowref - a reference to the row of a cell
 *
 * @returns [Column, Row] of the cell 
 */
export function getRefs(columnref: string, rowref: number){
  let [column, row] = sheetLayoutStore(state=>[
    state.columns.find(c=>c.ref == columnref),
    state.rows.find(r=>r.ref == rowref )
  ]);
  return [column, row] as [Column, Row];
}

export function getCellValue(cellref: CellRefrence|null) {
  return cellref?sheetDataStore(state=>state.data[cellref.rowref-1][toNumber(cellref.columnref)]):""; 
}
