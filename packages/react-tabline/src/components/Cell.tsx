import React, { ReactEventHandler, useEffect, useState, useRef } from 'react'
import { layoutStore as layout, CellStyle, Row, Column } from '../lib/layout';
import { useCell } from '../lib/interactions.ts';

type CellPropTypes = {
  column: Column,
  row: Row,
  style: CellStyle,
}
/**
 * Cell - Component repesenting a Cell is an Tabline Spreadsheet
 * */
const Cell : React.FC<CellPropTypes>= ({column, row, style}) => {
  const {styles, onInput, onSelect, showValue} = useCell(column.ref, row.ref, style)

  return (
  <textarea
      value = {showValue()}
      style = {styles}
      onChange={onInput}
      onFocus={onSelect}
    />
  )
}

export default Cell;
