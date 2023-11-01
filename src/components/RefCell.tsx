type RefCellPropTypes = {
  w: number,
  h: number,
  tRef: number | string,
  type: "row" | "column"
}

/**
 *
 * RefCell - Cell component repesenting a refrence cell is an Tabline Spreadsheet
 * */
const RefCell : React.FC<RefCellPropTypes> = ({w, h, tRef, type})=>{

  return (
    <div className="border border-zinc-500 rounded-sm text-center inline-block bg-stone-900 text-white" style={{width: w+'px', height: h+'px'}}> 
      {tRef}
    </div>
  )
}

export default RefCell;
