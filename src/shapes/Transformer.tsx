import { MouseEventHandler, useEffect, useRef, useState } from "react"
import { Shape } from "../models/Shape"

interface transformerProps{
    id:string,
    x:number,//left coord
    y:number,// top coord
    // newCoordOnMove:{x:number,y:number}
    // zoomLevel:number,
    // getData:(id:string,data:Shape)=>void
    // name:string
}

export default function Transformer({x,y,id,}:transformerProps){
    // const {x,y,id,newCoordOnMove,zoomLevel,getData,name} = props

    // const scalingFactor = 0.4;
    const elementRef = useRef<SVGGElement>(null);
    // const[offset,setOffset] = useState({x:0,y:0});
    // const[coord,setCoord] = useState({x:x,y:y});
    // const isClicked = useRef<boolean>(false);

    // useEffect(()=>{
    //   if(isClicked.current){
    //     setCoord(
    //       {x:(newCoordOnMove.x-offset.x)/zoomLevel,
    //         y:(newCoordOnMove.y-offset.y)/zoomLevel
    //       });
    // }
    // },[newCoordOnMove,offset])
    
    // const handleMouseDown:MouseEventHandler<SVGGElement> = (e)=>{
    //   e.preventDefault();
    // e.stopPropagation()
    //   // console.log(rect,radius,coord);
    //   setOffset({x:(e.clientX-coord.x*zoomLevel),y:(e.clientY-coord.y*zoomLevel)})
    //   isClicked.current = true
    //   // console.log(id)
    // }
    //   const handleMouseUp = ()=>{
    //     isClicked.current = false;
    //     getData(id,{name,id,x:coord.x,y:coord.y});
    //   }
    return(
  <g ref={elementRef}
    id={id}
    // onMouseDown={handleMouseDown}
    // onMouseUp={handleMouseUp}
    onMouseDown={(e)=>{e.preventDefault(); e.stopPropagation()}}
    className="transformer"
    // transform={`translate(${coord.x} ${coord.y}) scale(${scale})`}
    >
    <ellipse cx={127.5 + x} cy={127.5 + y} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
    <ellipse cx={167.5 + x} cy={127.5 + y} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
    <ellipse cx={150.5 + x} cy={92.5 + y} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
    <path d={`M ${115 + x} ${117 + y} L ${135 + x} ${127 + y} L ${115 + x} ${137 + y} Z`} fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" transform={`rotate(-90, ${125 + x}, ${127 + y})`} pointerEvents="all"/>
    <path d={`M ${143 + x} ${83 + y} L ${150 + x} ${90 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${150 + x} ${90 + y} L ${157 + x} ${83 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${150 + x} ${90 + y} L ${150 + x} ${100 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${163 + x} ${123 + y} L ${170 + x} ${130 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${170 + x} ${130 + y} L ${177 + x} ${123 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${170 + x} ${130 + y} L ${170 + x} ${140 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    {/* top cord =   */}
    <path d={`M ${150 + x} ${65 + y} L ${150 + x} ${35 + y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
    {/* bottom right = ${55 + x} ${150 + y} */}
    <path d={`M ${170 + x} ${185 + y} L ${170 + x} ${155 + y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
      {/* bototm left = ${14 + x } ${150 + y}*/}
    <path d={`M ${129 + x} ${185 + y} L ${129 + x} ${155 + y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
  </g>
    )
}