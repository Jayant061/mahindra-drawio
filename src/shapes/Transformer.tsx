import { MouseEventHandler, useEffect, useRef, useState } from "react"
import { Shape } from "../models/Shape"

interface transformerProps{
    id:string,
    x:number,//left coord
    y:number,// top coord
    newCoordOnMove:{x:number,y:number}
    zoomLevel:number,
    getData:(id:string,data:Shape)=>void
    name:string
}

export default function Transformer({x,y,id,newCoordOnMove,zoomLevel,getData,name}:transformerProps){
    // const {x,y,id,newCoordOnMove,zoomLevel,getData,name} = props

    // const scalingFactor = 0.4;
    const elementRef = useRef<SVGGElement>(null);
    const[offset,setOffset] = useState({x:0,y:0});
    const[coord,setCoord] = useState({x:x,y:y});
    const isClicked = useRef<boolean>(false);

    useEffect(()=>{
      if(isClicked.current){
        setCoord(
          {x:(newCoordOnMove.x-offset.x)/zoomLevel,
            y:(newCoordOnMove.y-offset.y)/zoomLevel
          });
    }
    },[newCoordOnMove,offset])
    
    const handleMouseDown:MouseEventHandler<SVGGElement> = (e)=>{
      e.preventDefault();
    e.stopPropagation()
      // console.log(rect,radius,coord);
      setOffset({x:(e.clientX-coord.x*zoomLevel),y:(e.clientY-coord.y*zoomLevel)})
      isClicked.current = true
      // console.log(id)
    }
      const handleMouseUp = ()=>{
        isClicked.current = false;
        getData(id,{name,id,x:coord.x,y:coord.y});
      }
    return(
  <g ref={elementRef}
    id={id}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    className="transformer"
    // transform={`translate(${coord.x} ${coord.y}) scale(${scale})`}
    >
    <ellipse cx={127.5 + coord.x} cy={127.5 + coord.y} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
    <ellipse cx={167.5 + coord.x} cy={127.5 + coord.y} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
    <ellipse cx={150.5 + coord.x} cy={92.5 + coord.y} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
    <path d={`M ${115 + coord.x} ${117 + coord.y} L ${135 + coord.x} ${127 + coord.y} L ${115 + coord.x} ${137 + coord.y} Z`} fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" transform={`rotate(-90, ${125 + coord.x}, ${127 + coord.y})`} pointerEvents="all"/>
    <path d={`M ${143 + coord.x} ${83 + coord.y} L ${150 + coord.x} ${90 + coord.y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${150 + coord.x} ${90 + coord.y} L ${157 + coord.x} ${83 + coord.y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${150 + coord.x} ${90 + coord.y} L ${150 + coord.x} ${100 + coord.y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${163 + coord.x} ${123 + coord.y} L ${170 + coord.x} ${130 + coord.y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${170 + coord.x} ${130 + coord.y} L ${177 + coord.x} ${123 + coord.y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${170 + coord.x} ${130 + coord.y} L ${170 + coord.x} ${140 + coord.y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    {/* top cord =   */}
    <path d={`M ${150 + coord.x} ${65 + coord.y} L ${150 + coord.x} ${35 + coord.y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
    {/* bottom right coord = ${55 + coord.x} ${150 + coord.y} */}
    <path d={`M ${170 + coord.x} ${185 + coord.y} L ${170 + coord.x} ${155 + coord.y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
      {/* bototm left coord = ${14 + coord.x } ${150 + coord.y}*/}
    <path d={`M ${129 + coord.x} ${185 + coord.y} L ${129 + coord.x} ${155 + coord.y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
  </g>
    )
}