import React, {useEffect, useState} from 'react'
import { useStyles } from '../../stores/interactions'

function FontSize() {
  const {setFontSize, selectedCell, getProperty} = useStyles()
  const property = getProperty("fontSize");
  const [size, setSize] = useState<string>(property?.fontSize || "12")

  useEffect(()=>{
    setFontSize(selectedCell as string, parseInt(size, 10))
  },[size])

  return (
    <div className='flex flex-row w-1/12'>
      <button onClick={setFontSize(selectedCell as string, parseInt(size, 10)+1)} className='border p-px rounded w-1/4'>+</button>
      <input 
        type="text"
        value={size}
        onChange={(e)=>setSize(e.target.value)}
        className='border p-px rounded w-1/2 text-center'
      />
      <button onClick={setFontSize(selectedCell as string, parseInt(size, 10)-1)} className='border p-px rounded w-1/4'>-</button>
    </div>
  )
}

export default FontSize
