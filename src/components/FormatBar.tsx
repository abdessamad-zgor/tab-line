import React from 'react'
import FontSize from './format-components/FontSize'
import CellBackground from './format-components/CellBackground'

function FormatBar() {
  return (
    <div className='flex flex-row '>
      <FontSize/>
      <CellBackground/>
    </div>
  )
}

export default FormatBar
