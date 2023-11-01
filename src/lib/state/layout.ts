import { create } from "zustand";
import { getAlpha, defaultRowHeight, defaultColumnWidth, defaultRowsNumber, defaultColumnsNumber, Row, Column, CellReference} from "../util";

/**
 * Layout state
 */
interface SheetLayoutState {
  rows: Row[],
  columns: Column[],
  currentCell: CellReference | null,
  resizeColumn: (ref: string, dw: number)=>void,
  resizeRow: (ref: number, dh: number)=>void,
  selectCell: (cell: CellReference | null)=>void
}

export const layoutStore = create<SheetLayoutState>()(
  (set)=>({
    rows: Array(defaultRowsNumber).fill(0).map((_,i)=>({h: defaultRowHeight, ref: i+1})),
    columns: Array(defaultColumnsNumber).fill(0).map((_,i)=>({w: defaultColumnWidth, ref: getAlpha(i)})),
    currentCell: null,
    resizeColumn: (ref, dw) => set((state)=>{
      let columnIndex = state.columns.findIndex(v=>v.ref == ref);
      if(columnIndex>=0){
        let column = { ...state.columns[columnIndex], w: state.columns[columnIndex].w+dw };
        state.columns[columnIndex] = column;
        state = {...state, columns: [...state.columns]};
      }
      return state;
    }),
    resizeRow: (ref, dh) => set((state)=>{
      let rowIndex = state.rows.findIndex(v=>v.ref == ref);
      if(rowIndex>=0){
        let row = { ...state.rows[rowIndex], h: state.rows[rowIndex].h+dh };
        state.rows[rowIndex] = row;
        state = {...state, rows: [...state.rows]};
      }
      return state;
    }),
    selectCell: (cell :CellReference|null)=>set((state)=>({
      ...state, currentCell: cell
    }))
  })
);
/**
 * getRefs - a hook to get the column and row from the references of a cell
 * 
 * @param {string} columnref - a reference to the column of a cell
 * @param {number} rowref - a reference to the row of a cell
 *
 * @returns [Column, Row] of the cell 
 */
export function getRefs(columnref: string, rowref: number){
  let [column, row] = layoutStore(state=>[
    state.columns.find(c=>c.ref == columnref),
    state.rows.find(r=>r.ref == rowref )
  ]);
  return [column, row] as [Column, Row];
}
