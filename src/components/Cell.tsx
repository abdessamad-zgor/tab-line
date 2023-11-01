import React, { ReactEventHandler, useEffect, useState, useRef } from 'react'
import { getRefs, layoutStore } from '../lib/state/layout';
import { getCellValue, dataStore } from '../lib/state/data';
import { evaluateExpression } from '../lib/expression/evaluater';

type CellPropTypes = {
  columnref : string,
  rowref: number
}
/**
 * Cell - Component repesenting a Cell is an Tabline Spreadsheet
 * */
const Cell : React.FC<CellPropTypes>= ({columnref, rowref}) => {
  const [column, row] = getRefs(columnref, rowref);
  const {currentCell, selectCell} = layoutStore((state)=>({currentCell:state.currentCell, selectCell: state.selectCell}));
  const {updateCell} = dataStore(state=>({updateCell: state.updateCell}));
  const [isSelected, setIsSelected] = useState(false);
  const cellRef = useRef<HTMLTextAreaElement|null>(null);
  const cellValue = getCellValue({columnref, rowref});
  const [evaluationResult, setEvaluationResult] = useState(evaluateExpression(cellValue.value.toString()))

  useEffect(()=>{
    if(currentCell){
      if(columnref!=currentCell.columnref || rowref != currentCell.rowref){
        setIsSelected(false);
        cellRef.current?.blur();
      } else {
        cellRef.current?.focus();
      }
    }
  }, [currentCell]);


  useEffect(()=>{
    setEvaluationResult(evaluateExpression(cellValue.value.toString()))
  }, [cellValue])

  /**
   * selects cell and toggles highlight 
   */
  const select: ReactEventHandler<HTMLTextAreaElement> = (e)=>{
    selectCell({columnref, rowref});
    setIsSelected(true);
  }

  const changeValue: ReactEventHandler<HTMLTextAreaElement> = (e)=>
      updateCell({columnref, rowref}, (e.target as HTMLTextAreaElement).value);
  

  return (
  <textarea 
      onClick={select}
      ref={cellRef}
      className={`p-px relative ${isSelected?"border border-sky-400":"border border-zinc-200"}`}
      style={{width: column.w+"px", height: row.h+"px", resize: "none", overflow: 'hidden'}}
      onChange={changeValue}
      value={
        isSelected?
          cellValue.value.toString() : evaluationResult.error ?
            "!Error": evaluationResult.data?.toString()}
    />
  )
}

export default Cell;



