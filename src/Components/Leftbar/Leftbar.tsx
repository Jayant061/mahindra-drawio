import React, { useState } from 'react'
import "./Leftbar.css"
import plusIcon from "../../assets/plus.png"
import CreateBlock from './CreateBlock/CreateBlock'

function Leftbar() {
  const [showDialog,setShowDialog] = useState<string>("")
  return (
    <div className="leftbarContainer">
        <section className="head">
          <span>Add Block or Component and start building SLD</span>
          {/* sbc short for showBlockOrComponent */}
          <button onClick={()=>{setShowDialog("sbc")}}><img src={plusIcon} alt="add img" /></button>
        </section>
        {showDialog && <section className="dialogBox">
          {showDialog==="sbc" && <div className="selectBlockOrComponent">
            <p onClick={()=>{setShowDialog("block")}}>Block</p>
            <p onClick={()=>{setShowDialog("component")}}>Component</p>
          </div>}
          {
            showDialog==="block" && <CreateBlock/>
          }

        </section>}
    </div>
  )
}

export default Leftbar