import React from 'react'
import { layoutStore as layout} from '../lib/layout'
import { dataStore as data } from '../lib/grid/store'

function Formula() {
  const {selectedCell} = layout(state=>({selectedCell: state.selectedCell}))
  const {value, updateCell} = data(state=>({value: state.data[selectedCell as string] || "", updateCell: state.updateCell}))
  return (
    <div className='flex flex-row gap-4 px-4 py-2'>
      <span className='p-px border rounded'>{selectedCell}</span>
      <input 
        className='p-px border rounded w-full'
        type="text"
        value={value}
        onChange={(e)=>updateCell(selectedCell as string, e.target.value)}
      />
    </div>
  )
}

export default Formula
