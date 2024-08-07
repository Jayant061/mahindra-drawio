import { MouseEventHandler, useEffect, useRef, useState } from "react"

interface transformerProps{
    id:string,
    x:number,//left coord
    y:number,// top coord
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
        console.log(rect);
        setOffset({x:e.clientX-coord.x,y:e.clientY-coord.y})
        isClicked.current = true;
        // console.log(rect,coord)
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
    onMouseUp={handleMouseUp}
    transform={`translate(${coord.x+9} ${coord.y}) scale(${scale})`}
    >
    <ellipse cx={127.5 + x - 115} cy={127.5 + y - 35} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
    <ellipse cx={167.5 + x - 115} cy={127.5 + y - 35} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
    <ellipse cx={150.5 + x - 115} cy={92.5 + y - 35} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
    <path d={`M ${115 + x - 115} ${117 + y - 35} L ${135 + x - 115} ${127 + y - 35} L ${115 + x - 115} ${137 + y - 35} Z`} fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" transform={`rotate(-90, ${125 + x - 115}, ${127 + y - 35})`} pointerEvents="all"/>
    <path d={`M ${143 + x - 115} ${83 + y - 35} L ${150 + x - 115} ${90 + y - 35}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${150 + x - 115} ${90 + y - 35} L ${157 + x - 115} ${83 + y - 35}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${150 + x - 115} ${90 + y - 35} L ${150 + x - 115} ${100 + y - 35}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${163 + x - 115} ${123 + y - 35} L ${170 + x - 115} ${130 + y - 35}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${170 + x - 115} ${130 + y - 35} L ${177 + x - 115} ${123 + y - 35}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${170 + x - 115} ${130 + y - 35} L ${170 + x - 115} ${140 + y - 35}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${150 + x - 115} ${65 + y - 35} L ${150 + x - 115} ${35 + y - 35}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${170 + x - 115} ${185 + y - 35} L ${170 + x - 115} ${155 + y - 35}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${129 + x - 115} ${185 + y - 35} L ${129 + x - 115} ${155 + y - 35}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
  </g>
    )
}