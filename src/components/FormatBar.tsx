import React from 'react'
import FontSize from './format-components/FontSize'
import CellBackground from './format-components/CellBackground'

function FormatBar() {
  return (
    <div className='flex flex-row py-2 px-4 gap-4'>
      <FontSize/>
      <CellBackground/>
    </div>
  )
}

export default FormatBar
