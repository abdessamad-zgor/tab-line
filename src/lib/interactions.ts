import React, {useState} from "react"
import {getAlpha} from "./util.ts"
import {dataStore as data} from "./grid/store.ts" 
import {layoutStore as layout} from "./layout.ts"


export const onInput = (ref: string)=>{
  const {updateCell} = data(state=>({updateCell: state.updateCell}))

  return (e: InputEvent)=>{
    let value = (e?.currentTarget as HTMLInputElement).value;
    updateCell(ref, value)
  }
}

export const onSelect = (ref: string)=>{
  const {selectCell} = layout(state=>({selectCell: state.selectCell}));

  return ()=>{
    selectCell(ref);
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
        let diff = e.clientY-prevPosition[1];
        setPrevPosition([e.clientX, e.clientY])
        resizeRow(rowToResize, diff)
      } else if (columnToResize) {
        let diff = e.clientX-prevPosition[0]
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
