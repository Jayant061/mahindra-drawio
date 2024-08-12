import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import { Shape } from "../models/Shape";

interface RelayProps {
  x: number;
  y: number;
  id: string;
  newCoordOnMove:{x:number,y:number}
  radius:number
  getData:(id:string,data:Shape)=>void
  name:string
  zoomLevel:number,
  className:string
}

const Relay: FC<RelayProps> = ({name, x, y, id, radius, newCoordOnMove,getData,zoomLevel,className}) => {
  const elementRef = useRef<SVGGElement>(null);
  const isClicked = useRef<boolean>(false);
  const [coord,setCoord]= useState({x,y});
  const [offset,setOffset] = useState({x:0,y:0})
  
useEffect(()=>{
  if(isClicked.current){
    setCoord(
      {x:(newCoordOnMove.x-offset.x)/zoomLevel,
        y:(newCoordOnMove.y-offset.y)/zoomLevel
      });
}
},[newCoordOnMove,offset,radius])

const handleMouseDown:MouseEventHandler<SVGGElement> = (e)=>{
  // console.log(rect,radius,coord);
  setOffset({x:(e.clientX-coord.x*zoomLevel),y:(e.clientY-coord.y*zoomLevel)})
  isClicked.current = true
  // console.log(id)
}
const handleMouseUp = ()=>{
  isClicked.current = false;
  getData(id,{name,id,x:coord.x,y:coord.y,radius});
}

const arr=[];
for(let i =0;i<=5;i++){
  let text = "";
  switch(i){
    case 0:
    text = "50N";
    break;

    case 1:
    text = "50";
    break;

    case 2:
    text = "51N";
    break;

    case 3:
    text = "51";
    break;

    case 4:
    text = "67N";
    break;

    case 5:
    text = "67";
    break;
  }
  arr.push(
    <g key={i}>
  <circle  cx={coord.x + 2*i*(radius+1)} cy={coord.y} r={radius} style={{margin:"0",padding:"0"}} />
  <text
   x={coord.x + 2*i*(radius+1)} 
  y={coord.y}
  textAnchor="middle"
  dominantBaseline="middle"
  stroke='none'
  fill='black'>
  {text}  </text>
  </g>
)
}
  return (
    <g ref={elementRef} fill="white" stroke="black" strokeWidth="0.5" x={x} y={y}
    className={className}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}>
      {arr}
    </g>

  );
};

export default Relay;
