import React, {useState} from 'react'
import {useStyles} from "../../lib/interactions";
import {getColorCodes} from "../../lib/util.ts"

function CellBackground() {
  const [openColorPalette, setOpenColorPalette] = useState<boolean>(false)
  const {setBackgroundColor, getBackgroundColor} = useStyles()
  const {backgroundColor} = getBackgroundColor()
  const colors = getColorCodes()
  return (
    <button className="relative" style={{backgroundColor: backgroundColor}} onClick={()=>setOpenColorPalette(!openColorPalette)}>
      BG
      {
        openColorPalette ?
          <div className="absolute top-[100%] grid grid-cols-6 gap-2">
            {
              colors.map(cc=>
                <span 
                  style={{backgroundColor: cc}}
                  className={`w-[1em] h-[1em] rounded-full border`}
                  onClick={()=>setBackgroundColor(cc)}></span>
              )
            }
          </div>:
          <></>

      }
    </button>
  )
}

export default CellBackground
