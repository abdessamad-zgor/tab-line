import { useState, useEffect, MouseEventHandler } from "react";
import { layoutStore } from "../lib/state/layout";
import { defaultRowHeight, Row } from "../lib/util";

import RefCell from "./RefCell";

export default function RefColumn() {
  let {rows, resizeRow} = layoutStore(state=>({rows: state.rows, resizeRow: state.resizeRow}));
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
