import { useEffect, useState, MouseEventHandler} from "react";
import { layoutStore } from "../lib/state/layout";
import { defaultRowHeight, Column } from "../lib/util";

import RefCell from "./RefCell";

export default function RefRow(){
  let {columns, resizeColumn} = layoutStore(state=>({columns: state.columns, resizeColumn: state.resizeColumn}));
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
