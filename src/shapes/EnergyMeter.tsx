import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Shape } from '../utils/Shape';
 
interface EnergyMeterProps {
//   uniqueId: string;
//   value: string;
  x: number;
  y: number;
  id: string,
radius:number,
newCoordOnMove:{x:number,y:number}
zoomLevel:number
getData:(id:string,data:Shape)=>void
  name:string

}
 
const EnergyMeter: FC<EnergyMeterProps> = ({  x, y, id, radius, newCoordOnMove,zoomLevel,getData,name}) => {
  const elementRef = useRef<SVGGElement>(null);
  const [coord,setCoord] = useState({x:x,y:y})
  const[offset,setOffset] = useState({x:0,y:0});
  // const [transform,setTransform] = useState(`translate(${coord.x} ${coord.y})`);
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
    // console.log(rect,radius,coord);
    setOffset({x:(e.clientX-coord.x*zoomLevel),y:(e.clientY-coord.y*zoomLevel)})
    isClicked.current = true
    // console.log(id)
  }

  const handleMouseUp = ()=>{
      isClicked.current = false;
      // console.log(coord.x, coord.y)
      getData(id,{id,name,x:coord.x,y:coord.y})
  }
 
  return (
    <g
      ref={elementRef}
      fill="transparent"
      stroke="green"
      strokeWidth="0.5"
      id={`EM${id}`}
      transform={`translate(${coord.x} ${coord.y})`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <circle cx={coord.x} cy={coord.y} radius={radius} id={`EM${id}`}/>
      {/* <text x="50%" y="50%" text-anchor="middle" fill="green" font-size="16px" font-family="Arial" dy=".3em">14W</text> */}
    </g>
  );
};
 
export default EnergyMeter;
 
 