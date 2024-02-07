import React, {useState} from 'react'
import {useStyles} from "../../lib/interactions";
import {colors} from "../../lib/util.ts"

function TextColor() {
  const [openColorPalette, setOpenColorPalette] = useState<boolean>(false)
  const {setTextColor, selectedCell, getProperty} = useStyles()
  const property = getProperty("color")
  return (
    <button className="relative p-2 rounded border shadow" 
      style={{backgroundColor: property?.backgroundColor || "#ffffff"}}
      onClick={()=>setOpenColorPalette(!openColorPalette)}>
      BG
      {
        openColorPalette ?
          <div className="absolute top-[100%] grid grid-cols-6 gap-2 w-[300%] p-2 rounded shadow bg-white">
            {
              Object.keys(colors).map(cc=>
                <span 
                style={{backgroundColor: colors[cc as keyof typeof colors]}}
                  className={`w-[1em] h-[1em] rounded-full border`}
                  onClick={setTextColor(selectedCell as string, colors[cc as keyof typeof colors])}></span>
              )
            }
          </div>:
          <></>

      }
    </button>
  )
}

export default TextColor
