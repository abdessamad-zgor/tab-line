import React, {useEffect, useState} from "react"
import {getAlpha} from "./util.ts"
import {dataStore as data} from "./grid/store.ts" 
import {CellStyle, layoutStore as layout} from "./layout.ts"

export function getValue(ref: string) {
  return data(state=>(state.data[ref] || "")); 
}

export const useCell = (column: string, row: string, style: CellStyle)=>{

  const [cellStyle, setCellStyle] = useState<CellStyle>(style)
  const {selectedCell, selectCell} = layout(state=>({selectedCell: state.selectedCell, selectCell: state.selectCell}))
  const {updateCell, value} = data(state=>({updateCell: state.updateCell, value: state.data[column+row]||""}))


  useEffect(()=>{
    if (column+row == selectedCell){
      setCellStyle({...cellStyle, borderColor: "#87CEFF", borderWidth: "2px"})
    }else {
      setCellStyle(style)
    } 
  
  },[selectedCell, style]);

  const onInput: React.ChangeEventHandler<HTMLTextAreaElement> = (e)=>{
    let value = e.currentTarget.value;
    updateCell(column+row, value)
  }

  const onSelect: React.FocusEventHandler<HTMLTextAreaElement> = ()=>{
    selectCell(column+row)
  }

  const getCellStyle: (st: CellStyle) => React.CSSProperties = (st) =>{
    return {
      ...st,
      width: "100%",
      height: "100%",
      resize: "none",
      outline: "none",
    }
  }

  const showValue = ()=>{
    // insert interpreter
    return column+row == selectedCell ? value : value
  }

  return {
    styles : getCellStyle(cellStyle),
    onInput,
    onSelect,
    showValue
  }
}


export const useResize = ()=>{
  const [rowToResize, setRowToResize] = useState<number|null>(null)
  const [columnToResize, setColumnToResize] = useState<string|null>(null)
  const [prevPosition, setPrevPosition] = useState<[number, number]|null>(null)
  const {resizeColumn, resizeRow} = layout(
    state=>({resizeColumn: state.resizeColumn, resizeRow: state.resizeRow}));

  const selectResizeColumn = <T>(key: number): React.MouseEventHandler<T>=>{

    return (e)=>{
      let elementRect = (e.target as HTMLElement).getBoundingClientRect();

      if (Math.abs(e.clientX-elementRect.right)<5) {
        setColumnToResize(getAlpha(key))
      } else if ( key!=0 && Math.abs(e.clientX-elementRect.left)<5) {
        setColumnToResize(getAlpha(key-1))
      }
      setPrevPosition([e.clientX, e.clientY])
    }
  }

  const isResizable =<T>(key: number):React.MouseEventHandler<T> =>{  
    return (e)=>{
      let elementRect = (e.target as HTMLElement).getBoundingClientRect();
      if (
        Math.abs(e.clientX-elementRect.right)<5 ||
          (key!=0 && Math.abs(e.clientX-elementRect.left)<5)) {
        document.body.style.cursor = "col-resize"
      } else if (
        Math.abs(e.clientY-elementRect.bottom)<5 ||
          (key!=0 && Math.abs(e.clientY-elementRect.top)<5)) {
        document.body.style.cursor = "row-resize"
      } else {
        document.body.style.cursor = "default"
      }
    }
  }

  const selectResizeRow = <T>(key: number): React.MouseEventHandler<T>=>{

    return (e)=>{
      let elementRect = (e.target as HTMLElement).getBoundingClientRect();

      if (Math.abs(e.clientY-elementRect.bottom)<5) {
        setRowToResize(key+1)
        document.body.style.cursor="row-resize"
      } else if (key!=0 && Math.abs(e.clientY-elementRect.top)<5) {
        setRowToResize(key)
        document.body.style.cursor="row-resize"
      }
      setPrevPosition([e.clientX, e.clientY])
    }
  }

  const resizeOnMove = <T>(): React.MouseEventHandler<T>=>{
    return (e)=>{
      
      if (rowToResize) {
        let diff = e.clientY-prevPosition[1] as number;
        console.log(diff)
        setPrevPosition([e.clientX, e.clientY])
        resizeRow(rowToResize, diff)
      } else if (columnToResize) {
        let diff = e.clientX-prevPosition[0] as number
        console.log(diff)
        setPrevPosition([e.clientX, e.clientY])
        resizeColumn(columnToResize, diff)
      }
    }
  }

  const doneResize = <T>(): React.MouseEventHandler<T>=>{
    return ()=>{
      if(columnToResize){
        setColumnToResize(null)
      } else if(rowToResize){
        setRowToResize(null)
      }
      setPrevPosition(null)
    }
  }

  return {
    selectResizeRow,
    selectResizeColumn,
    resizeOnMove,
    doneResize,
    isResizable
  }
}
