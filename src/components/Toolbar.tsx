import  { ReactEventHandler } from 'react'
import { layoutStore } from '../lib/state/layout';
import { dataStore, getCellValue } from '../lib/state/data';
import formulaIcon from "../assets/function.png";


/**
 * Toolbar - Components representing the toolbar of a Tabline spreadsheet
 */
const Toolbar = (props: {}) => {
  const {currentCell} = layoutStore((state)=>({currentCell: state.currentCell}));
  const {updateCell} = dataStore((state)=>({updateCell:state.updateCell}));
  const cellValue = getCellValue(currentCell)

  const updateCellValue: ReactEventHandler<HTMLInputElement> = (e)=>{
    if(currentCell)
      updateCell(currentCell,(e.target as HTMLInputElement).value);
  }

  return (
    <header className='p-2'>
      <div className='flex flex-row gap-2 justify-center items-center px-4'>
        <span className='border border-stone-400 py-px px-2 rounded text-lg'>{currentCell? currentCell.columnref+currentCell.rowref:""}</span>
        <img src={formulaIcon} alt='formula icon' className='w-[30px] h-[30px]'/>
        <input value={cellValue.value} className='text-lg w-full rounded border' onChange={updateCellValue}/>
      </div>
    </header>
  );
}

export default Toolbar;
