import React from 'react'
import { useStyles } from '../../lib/interactions'

function FontSize() {
  const {setFontSize, getFontSize} = useStyles()
  const {fontSize} = getFontSize();
  return (
    <div className='flex flex-row'>
      <button onClick={()=>setFontSize((new Number(fontSize)).valueOf()+1)} className='border p-px rounded'>+</button>
      <input 
        type="text"
        value={fontSize}
        onChange={(e)=>setFontSize((new Number(e.currentTarget.value)).valueOf())}
        className='border p-px rounded'
      />
      <button onClick={()=>setFontSize((new Number(fontSize)).valueOf()-1)} className='border p-px rounded'>-</button>
    </div>
  )
}

export default FontSize
