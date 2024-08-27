import React from 'react'
import "./CreateBlock.css";
interface parameterProps{
    actualParamters:string[],
    selectParameters: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
    assetId:string
}
function ParameterDropDown({actualParamters,selectParameters}:parameterProps) {
  return (
    <section className="selectParameters" onClick={(e)=>{e.preventDefault(); e.stopPropagation()}}>
        <span>working</span>
    </section>
  )
}

export default ParameterDropDown