import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";

interface Shape {
  name: string;
  x: number;
  y: number;
  radius?: number;
  id:string
}

interface RelayProps {
  x: number;
  y: number;
  id: string;
  newCoordOnMove:{x:number,y:number}
  radius:number
  getData:(id:string,data:Shape)=>void
  name:string
}

const Relay: FC<RelayProps> = ({name, x, y, id, radius, newCoordOnMove,getData}) => {
  const elementRef = useRef<SVGGElement>(null);
  const isClicked = useRef<boolean>(false);
  const [coord,setCoord]= useState({x,y});
  const [offset,setOffset] = useState({x:0,y:0})
  
//   const off
//   const handleMouseDown:MouseEventHandler<SVGGElement> = (e)=>{
//     isClicked.current = true
//     // setOffset({x:e.clientX-coord.x,y:e.clientY-coord.y});
//     // onMouseDown()
// }
useEffect(()=>{
  if(isClicked.current){
    setCoord({x:newCoordOnMove.x-offset.x,y:newCoordOnMove.y-offset.y});
}
},[newCoordOnMove,offset,radius])

const handleMouseDown:MouseEventHandler<SVGGElement> = (e)=>{
  // console.log(rect,radius,coord);
  setOffset({x:e.clientX-coord.x,y:e.clientY-coord.y})
  isClicked.current = true
  // console.log(id)
}
const handleMouseUp = ()=>{
  isClicked.current = false;
  getData(id,{name,id,x:coord.x,y:coord.y,radius});
}

const arr=[];
for(let i =0;i<=5;i++){
  // if(i===0){
  //   console.log(i,coord.x + 2*i*(radius+1), coord.y, radius, "left:", coord.x + 2*i*(radius+1)-radius, "top:", coord.y-radius)
  // }
  arr.push(<circle key={i} cx={coord.x + 2*i*(radius+1)} cy={coord.y} r={radius} style={{margin:"0",padding:"0"}} />)
}
  return (
    <g ref={elementRef} fill="white" stroke="black" strokeWidth="0.5" x={x} y={y}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}>
      {arr}
    </g>

  );
};

export default Relay;
