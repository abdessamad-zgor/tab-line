import React, { ReactEventHandler, useEffect, useState, useRef } from 'react'
import { layoutStore as layout, CellStyle, Row, Column } from '../lib/layout';
import {getValue} from "../lib/grid/store.ts";

type CellPropTypes = {
  column: Column,
  row: Row,
  style: CellStyle,
  onInput: (e: any)=>void,
  onSelect: ()=>void
}
/**
 * Cell - Component repesenting a Cell is an Tabline Spreadsheet
 * */
const Cell : React.FC<CellPropTypes>= ({column, row, style, onInput, onSelect}) => {
  const {selectedCell} = layout((state)=>({selectedCell: state.selectedCell}))

  useEffect(
    ()=>{
      if((column.ref+row.ref)==selectedCell){
        
      }
    }
  , [])

  const EvalueteValue = (value: string)=>{
    return value
  } 

  const getCellStyle: (st: CellStyle)=>CssProperties = (st) =>{
    return {
      width: "100%",
      height: "100%",
      resize: "none",
      outline: "none"
    }
  }

  return (
  <textarea
      value = {EvalueteValue(getValue(column.ref+row.ref).toString())}
      style = {getCellStyle(style)}
      onChange={onInput}
      onFocus={onSelect}
    />
  )
}

export default Cell;
