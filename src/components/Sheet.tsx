import { getAlpha,  defaultRowHeight } from "../lib/util.ts";  
import Cell, {ColumnRefRow , RowRefColumn} from "./Cell.tsx"
import { sheetLayoutStore } from "../lib/sheetStore.ts";

const Sheet = () => {
  let [columns, rows] = sheetLayoutStore(state=>[state.columns, state.rows]);
  return (
    <div className="flex flex-col justify-start items-start min-w-full min-h-full bg-white overflow-x-scroll">
      <div className="flex flex-row min-w-full flex-nowrap">
        <div className="border border-zinc-200 rounded-sm px-2 bg-stone-900" style={{minWidth: defaultRowHeight+"px", minHeight: defaultRowHeight+"px"}}> </div>
        <ColumnRefRow/>
      </div>

      <div className="flex flex-row min-w-full flex-nowrap">
        <RowRefColumn/>
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
