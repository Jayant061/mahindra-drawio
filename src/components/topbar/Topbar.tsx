import "./Topbar.css"
import homeImg from "../../assets/home.png"
import triangleDown from "../../assets/triangleDown.png";
import playIcon from "../../assets/play.png";
import { useState } from "react";

interface TopbarProps {
  captureSVG:() =>  void
}

function Topbar({ captureSVG } : TopbarProps) {
  const [isCompleteDisabled,setIsCompleteDisabled] = useState(true)

  return (
    <>
    <div className="topbarContainer">
        <span className="homeIcon">
            <img src={homeImg} alt="home"/>
            <img src={triangleDown} alt="more" style={{width:"0.7rem"}} />
        </span>
        <div className="heading"><span>SLD 001</span></div>
        <div className="btns">
        <button onClick={captureSVG}>Download</button>
        <button><img src={playIcon} alt="preview" /></button>
          <button onClick={()=>{setIsCompleteDisabled(prev=>!prev)}}>Save Draft</button>
          <button disabled={isCompleteDisabled} style={isCompleteDisabled?{backgroundColor:"rgba(255, 255, 255, 0.8)"}:
          {backgroundColor:"#8BBB04",color:"white"}}
          >Complete</button>
        </div>
    </div>
    </>
  )
}

export default Topbar;