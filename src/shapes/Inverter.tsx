import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Shape } from '../utils/Shape';
 
interface InverterProps {
//   uniqueId: string;
//   value: string;
  x: number;
  y: number;
  id: string,
newCoordOnMove:{x:number,y:number}
className:string
zoomLevel:number,
getData:(id:string,data:Shape)=>void
  name:string

}
 
const Inverter: FC<InverterProps> = ({  x, y, id, newCoordOnMove, className,zoomLevel,getData,name }) => {
  const elementRef = useRef<SVGGElement>(null);
  const [coord,setCoord] = useState({x:x,y:y})
  const[offset,setOffset] = useState({x:0,y:0});
  // const [transform,setTransform] = useState(`translate(${coord.x} ${coord.y})`);
  const isClicked = useRef<boolean>(false);
  const width = 100;
  const height = width / 2;
  
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
      fill="white"
      stroke="green"
      strokeWidth="0.5"
      id={`Inverter${id}`}
      transform={`translate(${coord.x} ${coord.y})`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={className}
    >
      <rect width={width} height={height} x={0} y={0} id={`InverterReactangle1`} />
      <rect width={0.1*width} height={0.1*height} x={width/2} y={-0.05*height} id={`InverterReactangle2`} fill='green' />
      <text
        id={`InvertedText1`}
        x={0.5 * width}
        y={0.55 * height}
        width={width - 2}
        fontFamily='sans-serif'
        stroke='none'
        fill='black'
        fontSize={2.5}
        textAnchor="middle"
        dominantBaseline="middle"
      >
      </text>
    </g>
  );
};
 
export default Inverter;
 
 