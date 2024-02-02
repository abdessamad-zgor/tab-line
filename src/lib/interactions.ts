import React, {useEffect, useState} from "react"
import {getAlpha, fontFamilies} from "./util.ts"
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

export const useStyles = ()=>{
  const {selectedCell, setStyles} = layout(state=>({selectedStyle: state.selectedStyle, setStyles: state.setStyles}))

  const setBackgroundColor = (color: string)=>{
    if(selectedCell)
      setStyles(selectedCell, {backgroundColor: color});
  }


  const getBackgroundColor = ()=>{
    return layout(state=>({backgroundColor: state.styles[selectedCell]?.bacgroundColor || "#ffffff"}))
  }

  const setTextColor = (color: string)=>{
    if(selectedCell)
      setStyles(selectedCell, {color: color});
  }

  const getTextColor = ()=>{
    return layout(state=>({color: state.styles[selectedCell]?.color || "#000000"}))
  }

  const setFontSize = (size: number)=>{
    if(selectedCell)
      setStyles(selectedCell, {fontSize: toPx(size)});
  }

  const getFontSize = ()=>{
    return layout(state=>({fontSize: state.styles[selectedCell]?.fontSize || "12"}))
  }

  const setFontFamily = (fontFamily: keyof typeof fontFamilies)=>{
    if(selectedCell)
      setStyles(selectedCell, {fontFamily: fontFamily});
  }

  const getFontFamily = ()=>{
    return layout(state=>({fontFamily: state.styles[selectedCell]?.fontFamily || "helvitica"}))
  }

  const setToBold = (unset?: boolean)=>{
    if(selectedCell) {
      if(!unset)
        setStyles(selectedCell, {
          fontWeight: 800
        })
      else 
        setStyles(selectedCell, {
          fontWeight: 500,
        })
      
    }
  }

  const getBold = ()=>{
    return layout(state=>({bold: state.styles[selectedCell]?.fontWeight >= 700 || false}))
  }

  const setToItalic = (unset?: boolean)=>{
    if(selectedCell) {
      if(!unset)
        setStyles(selectedCell, {
          fontStyle: "italic"
        })
      else 
        setStyles(selectedCell, {
          fontStyle: "normal"
        })
    }
  }

  const getItalic = ()=>{
    return layout(state=>({bold: state.styles[selectedCell]?.fontStyle == "italic" || false}))
  }

  const setBorder = (width: number, style: string, color: string)=>{
    if(selectedCell) 
      setStyles(selectedCell, {borderWidth: width+"px", borderStyle: style, borderColor: color})
  }

  const getBorder = ()=>{
    return layout(state=>({
      border: !(state.styles[selectedCell]?.borderWidth+
        " "+state.styles[selectedCell]?.borderStyle+
        " "+state.styles[selectedCell]?.borderColor).includes("undefined") ?
        (state.styles[selectedCell]?.borderWidth+
        " "+state.styles[selectedCell]?.borderStyle+
        " "+state.styles[selectedCell]?.borderColor): "none"
    }))
  }

  return {
    setBorder,
    setToBold,
    setToItalic,
    setFontSize,
    setFontFamily,
    setTextColor,
    setBackgroundColor,

    getBorder,
    getBold,
    getItalic,
    getFontSize,
    getFontFamily,
    getTextColor,
    getBackgroundColor
  }
}
