import React from 'react'
import FontSize from './format-components/FontSize'
import CellBackground from './format-components/CellBackground'
import TextColor from './format-components/TextColor'

function FormatBar() {
  return (
    <div className='flex flex-row py-2 px-4 gap-4'>
      <FontSize/>
      <CellBackground/>
      <TextColor/>
    </div>
  )
}

export default FormatBar
