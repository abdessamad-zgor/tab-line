import React, { MouseEventHandler, ReactEventHandler, useEffect, useState, useRef } from 'react'
import { getRefs, sheetLayoutStore, Column, Row, getCellValue } from '../lib/sheetStore'
import { defaultRowHeight, defaultColumnWidth } from '../lib/util'

type CellPropTypes = {
  columnref : string,
  rowref: number
}
/**
 * Cell - Component repesenting a Cell is an Tabline Spreadsheet
 * */
const Cell : React.FC<CellPropTypes>= ({columnref, rowref}) => {
  const [column, row] = getRefs(columnref, rowref);
  const {currentCell, selectCell} = sheetLayoutStore((state)=>({currentCell:state.currentCell, selectCell: state.selectCell}));
  const [isSelected, setIsSelected] = useState(false);
  const cellRef = useRef<HTMLDivElement|null>(null)
  const cellValue = getCellValue({columnref, rowref})

  useEffect(()=>{
    if(currentCell){
      if(columnref!=currentCell.columnref || rowref != currentCell.rowref){
        setIsSelected(false);
        cellRef.current?.blur()
      } else {
        cellRef.current?.focus()
      }
    }
  }, [currentCell])

  /**
   * selects cell and toggles highlight 
   */
  const select: ReactEventHandler<HTMLDivElement> = (e)=>{
    console.log(columnref, rowref)
    selectCell({columnref, rowref});
    setIsSelected(true)
  }

  return (
    <div onClick={select} ref={cellRef} className={`rounded-sm px-2 relative ${isSelected?"border-2 border-sky-400":"border border-stone-300"}`} style={{width: column.w+"px", height: row.h+"px"}} contentEditable={isSelected} >
      {cellValue.value}
    </div>
  )
}

export default Cell;

type RefCellPropTypes = {
  w: number,
  h: number,
  tRef: number| string,
  type: "row" | "column"
}

/**
 *
 * RefCell - Cell component repesenting a refrence cell is an Tabline Spreadsheet
 * */
export const RefCell : React.FC<RefCellPropTypes> = ({w, h, tRef, type})=>{

  return (
    <div className="border border-zinc-500 rounded-sm text-center inline-block bg-stone-900 text-white" style={{width: w+'px', height: h+'px'}}> 
      {tRef}
    </div>
  )
}


export function ColumnRefRow(){
  let {columns, resizeColumn} = sheetLayoutStore(state=>({columns: state.columns, resizeColumn: state.resizeColumn}));
  let [columnToResize, setColumnToResize] = useState<Column|null>(null);
  let [cursor, setCursor] = useState<"default"|"col-resize">("default");

  useEffect( ()=>{
    if (document.body.style.cursor != cursor) document.body.style.cursor = cursor;
  }, [cursor])

 //useEffect(()=>{
 //  console.log("columns: ",columns);
 //  console.log("columnToResize: ",columnToResize);
 //}, [columnToResize, columns])

  const resize : MouseEventHandler<HTMLDivElement> = (e)=>{
    let x = e.clientX;
    let refRow = e.currentTarget as HTMLDivElement;
    let refRowRect = refRow.getBoundingClientRect();
    let colBorders = columns.map((c,i)=>({...c,rightR:c.w+refRowRect.left+columns.slice(0,i).reduce((acc,cur)=>acc+=cur.w, 0)}));
    if(columnToResize!=null){
      let [column,columnIndex] = [columns.find(c=>c.ref == (columnToResize as Column).ref),columns.findIndex(c=>c.ref == (columnToResize as Column).ref)];
      let columnLeftRect = colBorders[columnIndex];
      let dw = e.clientX - columnLeftRect.rightR;
      //console.log("dw: ",dw)
      resizeColumn((column as Column).ref, dw);
    }else{
      let colRow = colBorders.findIndex((cb)=>x<=cb.rightR+2 && x>=cb.rightR-2);
      if(colRow>=0)
        setCursor("col-resize");
      else
        setCursor("default");
    }
  }

  const beginResize : MouseEventHandler<HTMLDivElement> = (e)=>{
    
    let x = e.clientX
    let refRow = e.currentTarget as HTMLDivElement;
    //console.log(e.currentTarget)
    let refRowRect = refRow.getBoundingClientRect();
    let colBorders = columns.map((c,i)=>({...c,rightR:c.w+refRowRect.left+columns.slice(0,i).reduce((acc,cur)=>acc+=cur.w, 0)}));
    let colRow = colBorders.findIndex((cb)=>x<=cb.rightR+5 && x>=cb.rightR-5);
    if(cursor=="col-resize"){
      if(colRow>=0) setColumnToResize(columns[colRow]);
    } 
  }

  const endResize : MouseEventHandler<HTMLDivElement> = (e)=>{
    if(columnToResize){
      setColumnToResize(null);
    }
  }

  return <div className='flex flex-1 flex-row min-w-full flex-nowrap' style={{userSelect:"none"}} onMouseMove={resize} onMouseDown={beginResize} onMouseUp={endResize}>
    {
      columns.map((c,i)=><RefCell key={i} tRef={c.ref} w={c.w} h={defaultRowHeight} type="column"/>)
    }
  </div>
}

export function RowRefColumn() {
  let {rows, resizeRow} = sheetLayoutStore(state=>({rows: state.rows, resizeRow: state.resizeRow}));
  let [rowToResize, setRowToResize] = useState<Row|null>(null);
  let [cursor, setCursor] = useState<"default"|"row-resize">("default");

  useEffect( ()=>{
    if (document.body.style.cursor != cursor) document.body.style.cursor = cursor;
  }, [cursor])

 //useEffect(()=>{
 //  console.log("rows: ",rows);
 //  console.log("rowToResize: ",rowToResize);
 //}, [rowToResize, rows])

  const resize : MouseEventHandler<HTMLDivElement> = (e)=>{
    let y = e.clientY;
    let refRow = e.currentTarget as HTMLDivElement;
    //console.log("rowColumnDiv: ",refRow)
    let refRowRect = refRow.getBoundingClientRect();
    let rowBorders = rows.map((c,i)=>({...c,bottomR:c.h+refRowRect.top+rows.slice(0,i).reduce((acc,cur)=>acc+=cur.h, 0)}));
    //console.log("rowBorders: ", rowBorders)
    if(rowToResize!=null){
      let [row,rowIndex] = [rows.find(c=>c.ref == (rowToResize as Row).ref),rows.findIndex(c=>c.ref == (rowToResize as Row).ref)];
      let rowLeftRect = rowBorders[rowIndex];
      let dh = e.clientY - rowLeftRect.bottomR;
      resizeRow((row as Row).ref, dh);
    }else{
      let rowCol = rowBorders.findIndex((cb)=>y<=cb.bottomR+2 && y>=cb.bottomR-2);
     // console.log(rowCol);
      if(rowCol>=0)
        setCursor("row-resize");
      else
        setCursor("default");
    }
  }

  const beginResize : MouseEventHandler<HTMLDivElement> = (e)=>{ 
    let y = e.clientY
    let refRow = e.currentTarget as HTMLDivElement;
    // console.log(e.currentTarget)
    let refColRect = refRow.getBoundingClientRect();
    let rowBorders = rows.map((c,i)=>({...c,bottomR:c.h+refColRect.top+rows.slice(0,i).reduce((acc,cur)=>acc+=cur.h, 0)}));
    let rowCol = rowBorders.findIndex((r)=>y<=r.bottomR+5 && y>=r.bottomR-5);
    if(cursor=="row-resize"){
      if(rowCol>=0) setRowToResize(rows[rowCol]);
    } 
  }

  const endResize : MouseEventHandler<HTMLDivElement> = (e)=>{
    if(rowToResize){
      setRowToResize(null);
    }
  }

  return <div className='flex flex-col justify-center items-center' style={{userSelect:"none"}} onMouseMove={resize} onMouseDown={beginResize} onMouseUp={endResize}>
    {
      rows.map((r,i)=><RefCell key={i} type={"row"} h={r.h} w={defaultRowHeight} tRef={r.ref}/>)
    }
  </div>
}
