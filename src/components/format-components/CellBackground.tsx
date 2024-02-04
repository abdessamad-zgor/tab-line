import React, {useState} from 'react'
import {useStyles} from "../../lib/interactions";
import {getColorCodes} from "../../lib/util.ts"

function CellBackground() {
  const [openColorPalette, setOpenColorPalette] = useState<boolean>(false)
  const {setBackgroundColor, selectedCell, getProperty} = useStyles()
  const property = getProperty("backgroundColor")
  const colors = getColorCodes()
  return (
    <button className="relative" 
      style={{backgroundColor: property?.backgroundColor || "#ffffff"}}
      onClick={()=>setOpenColorPalette(!openColorPalette)}>
      BG
      {
        openColorPalette ?
          <div className="absolute top-[100%] grid grid-cols-6 gap-2">
            {
              colors.map(cc=>
                <span 
                  style={{backgroundColor: cc}}
                  className={`w-[1em] h-[1em] rounded-full border`}
                  onClick={setBackgroundColor(selectedCell as string, cc)}></span>
              )
            }
          </div>:
          <></>

      }
    </button>
  )
}

export default CellBackground
