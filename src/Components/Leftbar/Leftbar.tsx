import React from 'react'
import "./Leftbar.css"
import plusIcon from "../../assets/plus.png"

function Leftbar() {
  return (
    <div className="leftbarContainer">
        <section className="head">
          <span>Add Block or Component and start building SLD</span>
          <button><img src={plusIcon} alt="add img" /></button>
        </section>
    </div>
  )
}

export default Leftbar