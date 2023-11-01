export function getAlpha(n: number): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if(n<alphabet.length) return alphabet[n];
  else return alphabet[n%alphabet.length]+getAlpha(Math.floor(n/alphabet.length))
}

export function toNumber(c:string): number {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if(c.length==1)
    return alphabet.indexOf(c.toUpperCase());
  else
    return alphabet.indexOf(c[0].toUpperCase())+(26+toNumber(c));
}

export const defaultColumnWidth = window?window.innerWidth*0.1:80;
export const defaultRowHeight = 30;

export const defaultColumnsNumber = 20;
export const defaultRowsNumber = 20;

export function initSheet(n: number, m: number){
  return Array(n).fill("").map(()=>Array(m).fill({value: ""}));
}

// ********** Application types

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
export interface Cell  {
  columnref: string,
  rowref: number,
  value: string|number,
}

export type CellReference = {
  columnref: string,
  rowref: number
}
