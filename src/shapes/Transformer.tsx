import { MouseEventHandler, useEffect, useRef, useState } from "react"

interface transformerProps{
    id:string,
    x:number,
    y:number,
    newCoordOnMove:{x:number,y:number}
}

export default function Transformer(props:transformerProps){
    const {x,y,id,newCoordOnMove} = props
    const scale = 0.6

    // const scalingFactor = 0.4;
    const elementRef = useRef<SVGGElement>(null);
    const[offset,setOffset] = useState({x:0,y:0});
    const[coord,setCoord] = useState({x:x,y:y});
    const isClicked = useRef<boolean>(false);

    const handleMouseDown:MouseEventHandler<SVGGElement> = (e)=>{
        const rect = elementRef.current?.getBoundingClientRect();
        if(!rect) return;
        // console.log(rect,radius,coord);
        setOffset({x:e.clientX-coord.x,y:e.clientY-coord.y})
        isClicked.current = true;
        console.log(rect,coord)
      }
      const handleMouseUp = ()=>{
        isClicked.current = false;
      }
      useEffect(()=>{
        if(isClicked.current){
            setCoord({x:newCoordOnMove.x-offset.x,y:newCoordOnMove.y-offset.y})
        }
      },[newCoordOnMove,offset])
    return(
    <g ref={elementRef}
    id={id}
    onMouseDown={handleMouseDown}
    onMouseUp = {handleMouseUp}
    transform={`translate(${coord.x} ${coord.y}) scale(${scale})`}
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
    <path d={`M ${150 + x} ${65 + y} L ${150 + x} ${35 + y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${170 + x} ${185 + y} L ${170 + x} ${155 + y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${129 + x} ${185 + y} L ${129 + x} ${155 + y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
  </g>
    )
}