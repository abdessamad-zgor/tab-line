import { getAlpha,  defaultRowHeight } from "../lib/util.ts";  
import { layoutStore } from "../lib/state/layout";

import Cell from "./Cell.tsx"
import RefRow from "./RefRow.tsx";
import RefColumn  from "./RefColumn.tsx";

const Sheet = () => {

  let [columns, rows] = layoutStore(state=>[state.columns, state.rows]);

  return (
    <div className="flex flex-col justify-start items-start min-w-full min-h-full bg-white overflow-x-scroll">
      <div className="flex flex-row min-w-full flex-nowrap">
        <div className="border border-zinc-200 rounded-sm px-2 bg-stone-900" style={{minWidth: defaultRowHeight+"px", minHeight: defaultRowHeight+"px"}}> </div>
        <RefRow/>
      </div>

      <div className="flex flex-row min-w-full flex-nowrap">
        <RefColumn/>
        <div>
          {
            rows.map(
              (_, i) =>
              <div key={i} className="flex flex-row flex-nowrap min-w-full ">
                {
                  columns.map(
                    (c,j)=>
                       <Cell rowref={i+1} columnref={getAlpha(j)} key={j} />
                  )
                }
              </div>
              
            )
          }
        </div>
      </div>

    </div>
  )
}
export default Sheet;
