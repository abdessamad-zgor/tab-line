import React, { ReactEventHandler, useEffect, useState } from 'react'
import formulaIcon from "../assets/function.png";
import { getCellValue, sheetDataStore, sheetLayoutStore } from '../lib/sheetStore';


/**
 * Toolbar - Components representing the toolbar of a Tabline spreadsheet
 */
export const Toolbar = (props: {}) => {
  const {currentCell} = sheetLayoutStore((state)=>({currentCell: state.currentCell}));
  const {updateCell} = sheetDataStore((state)=>({updateCell:state.updateCell}));
  const cellValue = getCellValue(currentCell)

  const updateCellValue: ReactEventHandler<HTMLInputElement> = (e)=>{
    setCellValue((e.target as HTMLInputElement).value);
  }

  useEffect(()=>{
    if(currentCell)
      setCellValue(getCellValue(currentCell).value);
  },[currentCell])

  useEffect(()=>{
    if(currentCell)
      updateCell(currentCell, cellValue);
  },[cellValue])

  return (
    <header className='p-2'>
      <div className='flex flex-row gap-2 justify-center items-center px-4'>
        <span className='border border-stone-400 py-px px-2 rounded text-lg'>{currentCell? currentCell.columnref+currentCell.rowref:""}</span>
        <img src={formulaIcon} alt='formula icon' className='w-[30px] h-[30px]'/>
        <input value={cellValue} className='text-lg w-full rounded border' onChange={updateCellValue}/>
      </div>
    </header>
  );
}
