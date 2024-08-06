// import React, { FC, useEffect, useRef } from "react";

// interface RelayProps {
//   x: number;
//   y: number;
//   onMouseDown: () => void;
// }

// const Relay: FC<RelayProps> = ({ x, y, onMouseDown }) => {
//   const elementRef = useRef<SVGGElement>(null);

//   useEffect(() => {
//     const element = elementRef.current;

//     const handleMouseDown = (e: MouseEvent) => {
//       onMouseDown();
//     };

//     element?.addEventListener("mousedown", handleMouseDown);

//     return () => {
//       element?.removeEventListener("mousedown", handleMouseDown);
//     };
//   }, [onMouseDown]);

//   return (
//     <g ref={elementRef} fill="white" stroke="black" strokeWidth="0.5">
//       <circle cx={x + 22} cy={y} r="5" />
//       <circle cx={x + 11} cy={y} r="5" />
//       <circle cx={x} cy={y} r="5" />
//       <circle cx={x - 11} cy={y} r="5" />
//       <circle cx={x - 22} cy={y} r="5" />
//       <circle cx={x - 33} cy={y} r="5" />
//     </g>
//   );
// };

// export default Relay;


import React, { FC, MouseEventHandler, useEffect, useRef, useState } from "react";

interface Shape {
  name: string;
  x?: number;
  y?: number;
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
    setCoord({x:newCoordOnMove.x-offset.x+radius,y:newCoordOnMove.y-offset.y+radius});
}
},[newCoordOnMove])

const handleMouseDown:MouseEventHandler<SVGGElement> = (e)=>{
  const rect = elementRef.current?.getBoundingClientRect();
  if(!rect) return;
  const origin = {
    x:rect?.x,
    y:rect?.y
  }
  // console.log(rect,radius,coord);
  setOffset({x:e.clientX-origin.x,y:e.clientY-origin.y})
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
