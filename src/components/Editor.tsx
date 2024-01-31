import React, {useState} from 'react'
import { layoutStore as layout} from "../lib/layout"
import {
  onInput,
  onSelect,
  useResize
} from "../lib/interactions.ts"
import Cell from "./Cell.tsx"


function Editor() {
  const {rows, columns, grid} = layout(state=>(
    {
      rows: state.rows,
      columns: state.columns,
      grid: state.grid
    }
  ))

  const {resizeOnMove, selectResizeRow, selectResizeColumn, doneResize, isResizable} = useResize()

  return (
    <div className="flex flex-row" onMouseMove={resizeOnMove} onMouseUp={doneResize}>
      <div className="flex flex-col">
        <span className="w-[20px] h-[20px] p-2"></span>
        {
          rows.map((r, ri)=><span onMouseDown={selectResizeRow(ri)} onMouseMove={isResizable(ri)} style={{width: "20px", height: `${r.h}px`}}>{r.ref}</span>)
        }
      </div>

      {
        columns.map(
          (c, ci)=><div className="flex flex-col items-center" style={{width: `${c.w}px`}}>
            <span onMouseDown={selectResizeColumn(ci)} onMouseMove={isResizable(ci)} className="text-center" style={{width: `${c.w}px`}} className="border text-center">{c.ref}</span>
            {
              rows.map(r=><span style={{width: `${c.w}px`, height: `${r.h}px`}}>
                <Cell
                  style={grid[`${c.ref+r.ref}`]}
                  column={c}
                  row={r}
                  onSelect={onSelect(c.ref+r.ref)}
                  onInput={onInput(c.ref+r.ref)}
                />
              </span>)
            }
          </div>
        )
      }
    </div>
  )
}

export default Editor
